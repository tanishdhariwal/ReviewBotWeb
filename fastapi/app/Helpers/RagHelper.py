from app.Model.embeddingModel import decode, tokenize
from app.DB.session import dbconnection
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
db = dbconnection()
products_collection = db['products']

def getContext(asin_no, user_query, top_k=3):
    try:
        product = products_collection.find_one({"product_asin_no": asin_no})
        query_embedding = tokenize(user_query)
        if product:
            results = []
            for doc in product["reviews"]:
                doc_embedding = np.array(doc["review_embeddings"])
                similarity = cosine_similarity([query_embedding], [doc_embedding])[0][0]
                results.append((doc["review"], similarity))
    
        # Sort by similarity
        results = sorted(results, key=lambda x: x[1], reverse=True)
        
        # Return top_k documents
        return [doc[0] for doc in results[:top_k]]

                
    except Exception as e:
        print(f"Exception occurred while fetching product data: {e}")
        return {"success": "false", "error": str(e)}
# print("context:",getContext("B0DNCK5CSW", "battery life"))