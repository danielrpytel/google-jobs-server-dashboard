import { IList_Job_Posting } from "../interfaces/Job_Posting_data";

function JobPostingListBlock(props: { job_posting: IList_Job_Posting }) {
	return (
		<div className="w-full h-32 border-b border-slate-700">
			<div className="flex flex-col text-gray-300 text-md">
				<div className="m-5">{props.job_posting.title}</div>
				<div className=""></div>
			</div>
		</div>
	);
}

export default JobPostingListBlock;
