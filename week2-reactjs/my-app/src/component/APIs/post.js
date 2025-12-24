import axios from "axios";
import { useEffect, useState } from "react";

function GetPost() {
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  async function getElementById() {
    try {
      setLoading(true);
      const rawData = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      setPost(rawData.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getElementById();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h3>Loading... (Đang đợi 2s)</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}

export default GetPost;
