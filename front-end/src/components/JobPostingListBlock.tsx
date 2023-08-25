import { IList_Job_Posting } from "../interfaces/Job_Posting_data";
import { FaExclamation } from "react-icons/fa";

function JobPostingListBlock(props: {
	job_posting: IList_Job_Posting;
	onClick: () => void;
}) {
	return (
		<div
			className="w-full h-36 border-b border-slate-700 cursor-pointer"
			onClick={props.onClick}
		>
			<div className="flex flex-row">
				<div className="flex flex-col text-gray-300 text-md m-5">
					<div className="mb-3 text-lg">{props.job_posting.title}</div>
					<div className="mb-1">{props.job_posting.company_name}</div>
					<div className="mb-3">{props.job_posting.location}</div>
				</div>
				{!props.job_posting.filtered && (
					<div className="min-w-20 ml-auto flex items-center ">
						<div className="relative group">
							<FaExclamation className="text-red-600 text-4xl" />
							<div className="absolute bg-white p-2 rounded-md shadow-md hidden text-gray-800 group-hover:block w-56 transform -translate-x-full">
								This job posting have not been filtered.
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default JobPostingListBlock;
