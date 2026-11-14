import mongoose from "mongoose";

mongoose.connect(
    'mongodb+srv://developersubhanahmed_db_user:wsfz0fyPn7aHa0dn@rag-clinical-cluster.mv9noeg.mongodb.net'
)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
});
export default mongoose;
