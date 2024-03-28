export const BlockInfo = () => (
  <div style={{ gridArea: "info", textAlign: "start" }}>
    <h2>What silencing does?</h2>
    <p>
      Domain silencing, also known as Domain Blocking, is a moderation tool for
      users that, for any reason, don't want to interact with{" "}
      <strong>any user of a given domain</strong>.
    </p>
    <p>When you silence a domain, Mastodon does a few things:</p>
    <p>
      <ul>
        <li>
          <em>Removes</em> any followers you have from that domain, and
          automaticaly rejects any new follow request from users on that domain.
        </li>
        <li>
          <em>Prevents</em> you from following any user on that domain.
        </li>
        <li>
          <em>Hides</em> all posts from those domains on your public timelines.
          Even boost from users of your domain, or other non-blocked domains.
        </li>
        <li>
          <em>Hides</em> any notification comming from interactions from users
          in silenced domains. <br />
          You'll will not be notified if someone from a silenced domain mentions
          you, or if they reply, favorite or boost your posts. More on that
          bellow.
        </li>
      </ul>
    </p>

    <h2>What silencing does not?</h2>
    <p>
      Silencing a server <em>DOES NOT</em> prevent that server to see your
      PUBLIC or UNLISTED posts.
    </p>
    <p>Example:</p>
    <p>
      If @someone@nonblocked.server boosts your post, a @follower@blocked.server
      can still see and interact with that post.
    </p>

    <small>
      More info:{" "}
      <a href="https://docs.joinmastodon.org/user/moderating/#block-domain">
        Mastodon Documentation
      </a>
    </small>
  </div>
);
