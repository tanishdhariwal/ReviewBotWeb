import requests
import os
from dotenv import load_dotenv
from app.Helpers.embeddingAndFormat import transform_data
from app.DB.session import dbconnection


load_dotenv()
api_key = os.getenv('SCRAPER_API_KEY')
if not api_key:
    raise Exception("SCRAPER_API_KEY environment variable not set")


# Connect to MongoDB
db = dbconnection()
products_collection = db['products']

def scrape_data(asin_no, domain="in"):
    print(f"Scraping data for ASIN: {asin_no}, domain: {domain}")
    payload = {
        "api_key": api_key,
        "asin": asin_no,
        "domain": domain,
        "page": "1"
    }
    url = "https://api.scrapingdog.com/amazon/reviews"
    try:
        print("Sending request to scraper")
        r = requests.get(url, params=payload)
        print("Received response from ScraperAPI")
        print(f"scraper Response status code: {r.status_code}")
        data = r.json()
        if r.status_code == 200:
            
            formatted_data = transform_data(data, asin_no)
            print("Successfully transformed the data")
            if isinstance(formatted_data, dict):
                
                
                products_collection.update_one(
                    {"product_asin_no": asin_no},
                    {"$set": formatted_data},
                    upsert=True
                )
                print("Data successfully saved to MongoDB")
                return formatted_data
            else:
                return {"success": "false", "error": "Unexpected formatted data format"}
        else:
            print(f"Error: {r.status_code}, Response: {data}")
            if isinstance(data, dict):
                return {"success": "false", "error": data}
            else:
                return {"success": "false", "error": "Unexpected response format"}
    except Exception as e: 
        print("Exception occurred while scraping data" + str(e))
        return {"success": "false", "error": str(e)}
# scrape_data("B0D1VLS5KJ")