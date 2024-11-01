from datetime import datetime
import logging
import re

logger = logging.getLogger(__name__)

def transform_data(data):
    try:
        formated_data = {
            "product_asin_no": data.get("product_asin_no", "N/A"),
            "product_url": data.get("product_url", "N/A"),
            "product_name": data.get("product_name", "N/A"),
            "product_brand": data.get("product_brand", "N/A"),
            "product_image_url": data.get("product_image_url", "N/A"),
            "average_rating": data.get("average_rating", "N/A"),
            "ratings_percentage": data.get("ratings_percentage", "N/A"),
            "reviews": []
        }
        
        for review in data.get("reviews", []):
            date_str = review.get("date", "N/A")  # E.g., 'Reviewed in India on 9 January 2024'
            date_match = re.search(r'Reviewed in .* on ([\d]+ [A-Za-z]+ [\d]{4})', date_str)
            if date_match:
                extracted_date_str = date_match.group(1)  # Extracts '9 January 2024'
                review_date = datetime.strptime(extracted_date_str, '%d %B %Y')
            else:
                # Handle cases where the date format does not match
                raise ValueError(f"Date format not recognized in {date_str}")
            
            formated_data["reviews"].append({
                "title": review.get("title", "N/A"),
                "review": review.get("review", "N/A"),
                "review_vector": review.get("review_vector", []),  
                "star": review.get("star", "N/A"),
                "date": review_date
            })
        
        logger.debug(f"Transformed data: {formated_data}")
        return formated_data
    except Exception as e:
        logger.exception("Error in transform_data")
        return {"success": "false", "error": str(e)}
