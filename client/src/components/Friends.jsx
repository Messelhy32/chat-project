const Friends = () => {
  const arr = [
    {
      name: "abdelrahman messelhy",
      last_msg: "hello",
    },
    {
      name: "moe messelhy",
      last_msg: "bye",
    },
    {
      name: "malak",
      last_msg: "hrw",
    },
  ];
  return (
    <>
      <h1>{sessionStorage.getItem('username')}s Friends</h1>
      {arr.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>{user.last_msg}</p>
        </div>
      ))}
    </>
  );
};

export default Friends;
