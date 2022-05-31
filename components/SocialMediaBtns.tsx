const SocialMedia = () => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <p style={{ marginBottom: "0px" }}>Share with friends</p>
      <a
        href={
          "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwordlebin.com"
        }
        target={"_blank"}
        rel="noreferrer"
        className="fa fa-facebook"
        title="share word game on Facebook"
        style={{ color: "#3B5998" }}
      />
      <a
        href={"https://twitter.com/share?url=https%3A%2F%2Fwordlebin.com"}
        target={"_blank"}
        rel="noreferrer"
        className="fa fa-twitter"
        title="share word game on Twitter"
        style={{ color: "#1DA1F2" }}
      />
      <a
        href={"https://reddit.com/submit?url=https%3A%2F%2Fwordlebin.com"}
        target={"_blank"}
        rel="noreferrer"
        className="fa fa-reddit"
        title="share word game on Reddit"
        style={{ color: "#FF5700" }}
      />
    </div>
  );
};

export default SocialMedia;
