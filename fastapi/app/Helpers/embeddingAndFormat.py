
from app.Model.embeddingModel import tokenize

def add_review(curr_data, review_data):
    try:
        if not isinstance(curr_data, dict):
            raise ValueError("Input data is not a dictionary")
        if not isinstance(review_data, dict):
            raise ValueError("New data is not a dictionary")
        for review in review_data["customer_reviews"]:
            
            date_str = review["date"]
        
            review_date = " ".join(date_str.split(" ")[-3:])
            review_embeddings = tokenize(review["review"])
            title_embeddings = tokenize(review["title"])            

            curr_data["reviews"].append({
                "title": review["title"],
                "title": title_embeddings,
                "review": review["review"],
                "review_embeddings": review_embeddings,  
                "star": review["rating"],
                "date": review_date
            })
        return curr_data
        
    except Exception as e:
        print(f"Exception occurred while adding review data: {e}")
        return {"success": "false", "error": str(e)}
        
    

def transform_data(data, ASIN_NO):
    try:
        if not isinstance(data, dict):
            raise ValueError("Input data is not a dictionary")
        formated_data = {
            "product_asin_no": ASIN_NO,
            "title": data["title"],
            "brand":data["brand"],
            "price": data["list_price"],
            "description": data["description"],
            "image_url": data["images"][:5],
            "features": data["feature_bullets"],
            "average_rating": data["average_rating"],
            "reviews": []
        }
        for review in data["customer_reviews"]:
            
            date_str = review["date"]
        
            review_date = " ".join(date_str.split(" ")[-3:])
            review_embeddings = tokenize(review["review_snippet"])
            title_embeddings = tokenize(review["review_title"])            

            formated_data["reviews"].append({
                "title": review["review_title"],
                "title_embeddings": title_embeddings,
                "review": review["review_snippet"],
                "review_embeddings": review_embeddings,  
                "star": review["rating"],
                "date": review_date
            })

    
        return formated_data
    except Exception as e:
        print(f"Exception occurred while transforming data: {e}")
        return {"success": "false", "error": str(e)}
