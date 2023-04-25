import styles from "./Stories.module.css";

export default function Story({ story, currentUser, onStoryClick }) {
  const fullName =
    currentUser && currentUser._id === story.user._id
      ? "Your Story"
      : story.user.fullName;

  return (
    <div
      className={styles.story}
      onClick={() => onStoryClick && onStoryClick(story._id)}
    >
      <img src={story.content} alt="" className={styles.story_img} />
      <div className={styles.story_profile_pic}>
        <img src={story.user.photo} alt="" />
      </div>
      <div className={styles.story_profile_name}>{fullName}</div>
    </div>
  );
}
