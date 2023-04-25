import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stories from "react-insta-stories";
import { useState, useEffect } from "react";
import axios from "axios";
function StoryDetailsPage(props) {
  const [queuedStories, setQueuedStories] = useState([]);
  const storedStories = localStorage.getItem("userStories");
  const [storiesGroupedByUser, setStoriesGroupedByUser] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const [remainingGroupsIndices, setRemainingGroupsIndices] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const convertedStories = storedStories ? JSON.parse(storedStories) : [];
  const navigate = useNavigate();
  const { postId } = useParams();

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8000/api/v1/stories/getAllStories"
      );
      setQueuedStories(result.data.stories);
    };

    fetchData();
  }, []);
  console.log("queuedStories", queuedStories);
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  };

  const groupStoriesByUser = () => {
    const groupedStories = queuedStories.reduce((groups, story) => {
      const userId = story.user._id;
      const userIndex = groups.findIndex((group) => group.userId === userId);

      if (userIndex === -1) {
        // Nếu chưa có nhóm câu chuyện cho người dùng này, tạo một nhóm mới
        groups.push({ userId, stories: [story] });
      } else {
        // Ngược lại, thêm câu chuyện vào mảng của người dùng tương ứng
        groups[userIndex].stories.push(story);
      }

      return groups;
    }, []);

    return groupedStories;
  };

  useEffect(() => {
    const groupedStories = groupStoriesByUser();
    setStoriesGroupedByUser(groupedStories);
  }, [queuedStories]);
  console.log("storiesGroupedByUser", storiesGroupedByUser);

  useEffect(() => {
    setRemainingGroupsIndices(
      Array.from({ length: storiesGroupedByUser.length }, (_, index) => index)
    );
  }, [storiesGroupedByUser]);

  const handleButtonClick = () => {
    // Kiểm tra nếu tất cả các nhóm câu chuyện đã được hiển thị
    if (remainingGroupsIndices.length === 0) {
      navigate("/");
      setRemainingGroupsIndices(
        Array.from({ length: storiesGroupedByUser.length }, (_, index) => index)
      );
      return;
    }

    let randomGroup;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * remainingGroupsIndices.length);
      const randomGroupIndex = remainingGroupsIndices[randomIndex];
      randomGroup = storiesGroupedByUser[randomGroupIndex];
    } while (
      randomGroup &&
      randomGroup.stories.length > 0 &&
      randomGroup.userId === postId
    );

    if (randomGroup && randomGroup.stories.length > 0) {
      // Cập nhật câu chuyện hiện tại là tất cả các câu chuyện của nhóm này
      setCurrentStory(randomGroup.stories);
      // Loại bỏ nhóm câu chuyện này khỏi danh sách chưa hiển thị
      setRemainingGroupsIndices(
        remainingGroupsIndices.filter((_, index) => index !== randomIndex)
      );
    }
  };

  console.log("currentStory", currentStory);
  function convertStoriesToInstaStories(stories) {
    return stories.map((story) => ({
      url: story.content,
      header: {
        heading: story.user.fullName,
        profileImage: story.user.photo,
      },
      duration: 1500,
      seeMore: ({ close }) => {
        return <div onClick={close}>Hello, click to close this.</div>;
      },
    }));
  }

  const [instaStory, setInstaStory] = useState(null);

  useEffect(() => {
    if (currentStory) {
      const convertedStory = convertStoriesToInstaStories(currentStory);
      setInstaStory(convertedStory);
    }
  }, [currentStory]);

  console.log("currentStory", currentStory);
  const storyContent = {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    height: "100%",
    objectFit: "cover",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "65px",
    left: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };
  const nextButtonStyle = {
    position: "absolute",
    bottom: "50%",
    right: "35%",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };
  const handleCloseButtonClick = () => {
    navigate("/");
  };
  console.log("instaStory", instaStory);
  return (
    <React.Fragment>
      <div style={containerStyle}>
        <div style={closeButtonStyle} onClick={handleCloseButtonClick}>
          <span>x</span>
        </div>
        <div style={nextButtonStyle} onClick={handleButtonClick}>
          <span>&gt;</span>
        </div>
        {!instaStory && (
          <Stories
            stories={convertedStories.map((story) => ({
              ...story,
              storyStyles: storyContent,
            }))}
            defaultInterval={1500}
            width={"calc(80vh * 9 / 16)"}
            height={"80vh"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "transparent",
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: "30px",
            }}
            loop={false}
            keyboardNavigation={true}
            isPaused={() => {}}
            currentIndex={() => {}}
            onStoryStart={() => {}}
            onStoryEnd={() => {}}
            onAllStoriesEnd={onAllStoriesEndHandler}
            storyStyles={{
              ...storyContent,
              background: "cover",
            }}
          />
        )}
        {instaStory && (
          <Stories
            stories={instaStory.map((story) => ({
              ...story,
              storyStyles: storyContent,
            }))}
            defaultInterval={1500}
            width={"calc(80vh * 9 / 16)"}
            height={"80vh"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "transparent",
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: "30px",
            }}
            loop={false}
            keyboardNavigation={true}
            isPaused={() => {}}
            currentIndex={() => {}}
            onStoryStart={() => {}}
            onStoryEnd={() => {}}
            onAllStoriesEnd={onAllStoriesEndHandler}
            storyStyles={{
              ...storyContent,
              background: "cover",
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default StoryDetailsPage;
