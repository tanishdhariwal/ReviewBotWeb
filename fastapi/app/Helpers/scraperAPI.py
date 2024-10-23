import requests
import os
from dotenv import load_dotenv
from formatter import transform_data

load_dotenv()
api_key = os.getenv('SCRAPER_API_KEY')
if not api_key:
    raise print("SCRAPER_API_KEY environment variable not set")
  
def scrape_data(asin_no, country = "in"):
  payload = {'api_key': api_key, 'asin': asin_no, 'country': country, 'tld': 'in',"OUTPUT_FORMAT":"json","REVIEW_TYPE":"all"}
  r = requests.get('https://api.scraperapi.com/structured/amazon/review', params=payload)
  data = r.json()

  if r.status_code == 200:
      formatted_data = transform_data(data)
      return formatted_data
  else:
      print(f"Error: {r.status_code}")
      return {}