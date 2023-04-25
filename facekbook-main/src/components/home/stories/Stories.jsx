import { Plus } from "../../../svg";
import styles from "./Stories.module.css";
import Story from "./Story";
import Card from "../../UI/Card/Card";
import { ScrollContainer } from "react-indiana-drag-scroll";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const [queuedStories, setQueuedStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);

  const currentUser = useSelector((state) => state.user.userinfo);
  const navigate = useNavigate();

  const handleCreateStoryClick = () => {
    navigate("/stories/add");
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8000/api/v1/stories/getAllStories"
      );
      setStories(result.data.stories);
    };

    fetchData();
  }, []);
  // const filterFirstStory = (stories) => {
  //   const userStoryDisplayed = {};
  //   const firstStories = [];

  //   stories.forEach((story) => {
  //     const userId = story.user._id;
  //     if (!userStoryDisplayed[userId]) {
  //       userStoryDisplayed[userId] = true;
  //       firstStories.push(story);
  //     }
  //   });
  //   console.log("firstStories", firstStories);
  //   return firstStories;
  // };
  const filterFirstStory = (stories) => {
    const userStoryDisplayed = {};
    const firstStories = [];

    // Sắp xếp mảng stories để đưa story của currentUser lên đầu tiên
    const sortedStories = stories.sort((a, b) => {
      if (currentUser && a.user._id === currentUser._id) {
        return -1;
      } else if (currentUser && b.user._id === currentUser._id) {
        return 1;
      } else {
        return 0;
      }
    });

    sortedStories.forEach((story) => {
      const userId = story.user._id;
      if (!userStoryDisplayed[userId]) {
        userStoryDisplayed[userId] = true;
        firstStories.push(story);
      }
    });

    return firstStories;
  };

  //  const shouldHideCreateStory = (stories) => {
  //    return stories.some((story) => {
  //      console.log("story.user._id:", story.user._id);
  //      return currentUser && currentUser._id === story.user._id;
  //    });
  //  };

  // const shouldHideCreate = shouldHideCreateStory(stories);
  // console.log("shouldHideCreate", shouldHideCreate);
  const firstStories = filterFirstStory(stories);
  // console.log("firstStories", firstStories);
  function handleStoryClick(storyId) {
    //
    const selectedStory = stories.find((story) => story._id === storyId);
    // console.log("stories: ", stories);
    console.log("selectedStory: ", selectedStory);
    const userStories = stories.filter(
      (story) => story.user._id === selectedStory.user._id
    );

    console.log("currentStory", currentStory);
    console.log("userStories: ", userStories);
    const convertedStories = userStories.map((story) => ({
      url: story.content,
      type: "image", // Or use logic to determine the file type based on the URL
      header: {
        heading: story.user.fullName,
        profileImage: story.user.photo,
      },
      seeMore: true,
      duration: 1500,
      seeMore: ({ close }) => {
        return <div onClick={close}>Hello, click to close this.</div>;
      },
    }));
    console.log("convertedStories: ", convertedStories);
    localStorage.setItem("userStories", JSON.stringify(convertedStories));
    const otherStories = stories.filter((story) => story._id !== storyId);
    setQueuedStories(otherStories);
    setCurrentStory(userStories);
    navigate(`/stories/${storyId}`);
  }

  return (
    <Card className={styles.wrap}>
      <ScrollContainer>
        <div className={styles.stories}>
          <div
            className={styles.create_story_card}
            onClick={handleCreateStoryClick}
          >
            <img
              src={currentUser.photo}
              alt={currentUser.photo}
              className={styles.create_story_img}
            />
            <div className={styles.plus_story}>
              <Plus color="#fff" />
            </div>
            <div className={styles.story_create_text}>Create Story</div>
          </div>

          {Array.isArray(firstStories) &&
            firstStories.map((story, i) => (
              <Story
                story={story}
                currentUser={currentUser}
                onStoryClick={handleStoryClick}
                key={i}
              />
            ))}
        </div>
      </ScrollContainer>
    </Card>
  );
}

export default Stories;
