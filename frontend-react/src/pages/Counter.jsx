import React, { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // useEffect chạy mỗi khi count thay đổi
  useEffect(() => {
    console.log("Giá trị count mới:", count);
  }, [count]);

  return (
    <div>
      <h2>Giá trị: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Tăng
      </button>
      <button onClick={() => setCount(count - 1)}>
        Giảm
      </button>
    </div>
  );
}