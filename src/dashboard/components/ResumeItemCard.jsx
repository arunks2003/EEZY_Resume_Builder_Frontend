import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeItemCard = (resume) => {
  console.log(resume.resume.id)
  return (
    <Link to={'/dashboard/resume/' + resume.resume.id + '/edit'}>
      <div className="p-14 flex items-center justify-center hover:scale-105 transition-all hover:shadow-md cursor-pointer bg-slate-200 h-[270px] rounded-t-lg border-t-4 border-primary rounded-lg">
        <Notebook></Notebook>
      </div>
      <h2 className=" text-center my-1">{resume.resume.attributes.title}</h2>
    </Link>
  )
};

export default ResumeItemCard;
