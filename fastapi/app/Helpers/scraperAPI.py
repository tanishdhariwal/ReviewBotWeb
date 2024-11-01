import requests
import os
from dotenv import load_dotenv
from app.Helpers.formatter import transform_data

load_dotenv()
api_key = os.getenv('SCRAPER_API_KEY')
if not api_key:
    raise Exception("SCRAPER_API_KEY environment variable not set")


def scrape_data(asin_no, country="in"):
    print(f"Scraping data for ASIN: {asin_no}, country: {country}")
    payload = {
        'api_key': api_key,
        'asin': asin_no,
        'country': country,
        'tld': 'in',
        "OUTPUT_FORMAT": "json",
        "REVIEW_TYPE": "all"
    }
    print(f"Payload for request: {payload}")
    try:
        r = requests.get('https://api.scraperapi.com/structured/amazon/review', params=payload)
        print(f"Response status code: {r.status_code}")
        data = r.json()
        if r.status_code == 200:
            print("Successfully retrieved data")
            formatted_data = transform_data(data)
            print(f"Formatted data: {formatted_data}")
            return formatted_data
        else:
            print(f"Error: {r.status_code}, Response: {data}")
            return {"success": "false", "error": data}
    except Exception as e:
        print("Exception occurred while scraping data")
        return {"success": "false", "error": str(e)}

# Removed the misplaced date parsing code