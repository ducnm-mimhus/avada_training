const axios = require("axios");
const fs = require("fs");

/* 1. Goi API */
const URL = "https://jsonplaceholder.typicode.com";

const fetchData = async (endpoint) => {
  // try {
  //   const response = await axios.get(`${URL}${endpoint}`);
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }

  try {
    const response = await fetch(`${URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("Error: ", response.status);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

/* 3. Lay toan bo danh sach posts va comments roi map voi user dung dinh dang */
const getAllPostAndCommentByUser = (users, posts, comments) => {
  let userData = users.map((user) => {
    const { address, phone, website, company, ...userInfo } = user;

    const userPosts = posts.filter((post) => post.userId === user.id);
    const listPostClean = userPosts.map((post) => {
      const { userId, ...postClean } = post;
      return postClean;
    });

    const userPostIds = userPosts.map((post) => post.id);
    const userComments = comments.filter((comment) =>
      userPostIds.includes(comment.postId)
    );
    const listCommentClean = userComments.map((comment) => {
      const { email, ...commentClean } = comment;
      return commentClean;
    });

    return {
      ...userInfo,
      comments: listCommentClean,
      posts: listPostClean,
    };
  });
  return userData;
};

/* 4. Loc ra cac nguoi dung co nhieu hon 3 comment */
const filterUserWithMoreThan3Comments = (userData) => {
  const listUser = userData.filter((user) => {
    return user.comments.length > 3;
  });

  const result = listUser.map((user) => {
    const { comments, posts, ...userClean } = user;
    return userClean;
  });
  return result;
};

// 5.Format lai data theo mau
const reformatData = (userData) => {
  return userData.map(({ id, name, username, email, comments, posts }) => ({
    id,
    name,
    username,
    email,
    commentCount: comments.length,
    postCount: posts.length,
  }));
};

// 6. Tim kiem cac user co nhieu bai post nhat
const searchUserWithTheMostPost = (userData) => {
  if (!userData) {
    console.log("User data is empty!");
    return;
  }

  const maxPost = Math.max(...userData.map((user) => user.postCount));
  return userData.filter((user) => user.postCount === maxPost);
};

// 7. Sap xep user theo postCount
const sortUserByPostCount = (userData) => {
  const userDataClone = [...userData];
  return userDataClone.sort(
    (user1, user2) => user2.postCount - user1.postCount
  );
};

// 8.Lay post and comment with ID of 1
const getPostAndCommentId1 = async () => {
  const [post, commentFilter] = await Promise.all([
    fetchData("/posts/1"),
    fetchData("/posts/1/comments"),
  ]);

  return {
    ...post,
    comments: commentFilter,
  };
};

const main = async () => {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchData("/users"),
      fetchData("/posts"),
      fetchData("/comments"),
    ]);

    // 3. Map data
    const userData = getAllPostAndCommentByUser(users, posts, comments);

    // 4. Filter
    const listUserWithMoreThan3Comments =
      filterUserWithMoreThan3Comments(userData);

    // 5. Reformat
    const formattedData = reformatData(userData);

    // 6. Search Max Post
    const listUserWithTheMostPost = searchUserWithTheMostPost(formattedData);

    // 7. Sort
    const listUserSortedByPostCount = sortUserByPostCount(formattedData);

    // 8. Get Post ID 1 via API Request
    const post1Data = await getPostAndCommentId1();

    try {
      // Chuẩn bị nội dung
      const outputFiles = [
        { name: "2_UserInfo.txt", data: users },
        { name: "3_UserDataMapped.txt", data: userData },
        {
          name: "4_UserMoreThan3Comments.txt",
          data: listUserWithMoreThan3Comments,
        },
        { name: "5_ReformattedData.txt", data: formattedData },
        { name: "6_UserMostPosts.txt", data: listUserWithTheMostPost },
        { name: "7_SortedUsers.txt", data: listUserSortedByPostCount },
        { name: "8_PostId1Data.txt", data: post1Data },
      ];

      // Ghi noi dung ra file
      outputFiles.forEach((file) => {
        fs.writeFileSync(
          file.name,
          JSON.stringify(file.data, null, 2),
          "utf-8"
        );
        console.log(`Da ghi ket qua ra file: ${file.name}`);
      });
    } catch (err) {
      console.error("Loi khi ghi file:", err);
    }
  } catch (error) {
    console.error("Loi khi goi API!", error.message);
  }
};

main();
