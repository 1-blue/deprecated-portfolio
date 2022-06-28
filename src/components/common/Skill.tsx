type Props = {
  skill: string;
};

const Skill = ({ skill }: Props) => {
  return (
    <li className="bg-indigo-400 text-white inline-block p-2 rounded-lg mb-2">
      {skill}
    </li>
  );
};

export default Skill;
