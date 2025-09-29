import { useSelector } from "react-redux";

const profil = () => {
  const person = useSelector((state) => state.user.user);
  console.log(person);

  return (
    <div>
      <h1> Welcome {person.name} {person.lastName} to Vounis  </h1>
      <br />
        <img src= {person.profilePhoto} />

    </div>
  );
};

export default profil;
