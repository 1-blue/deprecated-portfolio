type Props = {
  skill: string;
};

const Skill = ({ skill }: Props) => {
  return (
    <li className="bg-white text-black inline-block p-2 rounded-lg mb-2">
      {skill}
    </li>
  );
};

export default Skill;
