import requests
import os
from dotenv import load_dotenv
from app.Helpers.embeddingAndFormat import transform_data, add_review
from app.DB.session import dbconnection


load_dotenv()
api_key = os.getenv('SCRAPER_API_KEY')
if not api_key:
    raise Exception("SCRAPER_API_KEY environment variable not set")

db = dbconnection()
products_collection = db['products']

def scrape_data(asin_no, domain="in"):
    print(f"Scraping data for ASIN: {asin_no}, domain: {domain}")
    payload = {
        "api_key": api_key,
        "asin": asin_no,
        "domain": domain,
    }
    product_url = "https://api.scrapingdog.com/amazon/product"
    review_url = "https://api.scrapingdog.com/amazon/reviews"
    try:
        r = requests.get(product_url, params=payload)
        print("Received product response from ScraperAPI")
        if r.status_code == 200:
            product_data = r.json()
            formatted_data = transform_data(product_data, asin_no)
        for i in range(5):
            payload["page"] = str(i)
            print("Sending request to scraper")
            r = requests.get(review_url, params=payload)
            print("Received response from ScraperAPI, Response status code: {r.status_code}")
            
            if r.status_code == 200:
                
                review_data = r.json()
                if(review_data["customer_reviews"] == []):
                    break
                formatted_data = add_review(formatted_data, review_data)
                print("Successfully transformed the data")
            else:
                print("response status code of review scrape is not 200")
                if(formatted_data["reviews"] == []):
                    print("failed to get any reviews")
                    
                break
                
        if isinstance(formatted_data, dict):
            print("updating data to MongoDB")
            
            products_collection.update_one(
                {"product_asin_no": asin_no},
                {"$set": formatted_data},
                upsert=True
            )
            print("Data successfully saved to MongoDB")
            return formatted_data
        else:
            return {"success": "false", "error": "Unexpected formatted data format"}
    except Exception as e: 
        print("Exception occurred while scraping data" + str(e))
        return {"success": "false", "error": str(e)}
