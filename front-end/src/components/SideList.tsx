import React from "react";
import { IList_Job_Posting } from "../interfaces/Job_Posting_data";
import JobPostingListBlock from "./JobPostingListBlock";

function SideList(props: {
	job_list_data: IList_Job_Posting[];
	onJobPostingClick: (id: number) => void;
}) {
	return (
		<div className="w-full bg-slate-800 border-slate-400 lg:w-3/12 h-[calc(100vh-5.1rem)]">
			<div className="overflow-auto h-full">
				{props.job_list_data.map((listing) => (
					<JobPostingListBlock
						key={listing.id}
						job_posting={listing}
						onClick={() => props.onJobPostingClick(listing.id)}
					/>
				))}
			</div>
		</div>
	);
}

export default SideList;
