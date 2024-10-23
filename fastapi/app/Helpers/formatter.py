from datetime import datetime


def transform_data(data):
    formated_data = {
        "product_asin_no": data["product_asin_no"],
        "product_url": data["product_url"],
        "product_name": data["product_name"],
        "product_brand": data["product_brand"],
        "product_image_url": data["product_image_url"],
        "average_rating": data["average_rating"],
        "ratings_percentage": data["ratings_percentage"],
        "reviews": []
    }
    
    for review in data["reviews", []]:

        review_date = datetime.strptime(review["date"], f"%Y-%m-%d")
        
        formated_data["reviews"].append({
            "title": review["title"],
            "review": review["review"],
            "review_vector": review["review_vector", []],  
            "star": review["star"],
            "date": review_date
        })
    
    return formated_data