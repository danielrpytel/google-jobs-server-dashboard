import { useGetFilter } from "../hooks/useGetFilter";
import { IList_Job_Posting } from "../interfaces/Job_Posting_data";
import JobPostingListBlock from "./JobPostingListBlock";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function SideList(props: {
	job_list_data: IList_Job_Posting[];
	onJobPostingClick: (id: number) => void;
	onFilterComplete: () => void;
}) {
	const { filterStatus, changedRows, handleFilterClick, isOpen, toggleDiv } =
		useGetFilter(props.onFilterComplete);

	return (
		<div className="relative w-full bg-slate-800 border-slate-400 lg:w-3/12 h-[calc(100vh-5.1rem)]">
			<div className="overflow-auto h-full">
				<div className="absolute w-[calc(100%-1rem)]  bg-slate-800 border-slate-700 border-b z-50">
					{isOpen && (
						<div className="">
							<div className="flex justify-center">
								<button
									onClick={async () => {
										await handleFilterClick();
									}}
									className="my-4 px-4 py-2 items-center bg-blue-500 text-white rounded"
								>
									Invoke Filter
								</button>
							</div>
							<div className="flex justify-center">
								{filterStatus === "success" && (
									<p className="text-green-500 mb-3">
										Filtering successful! Changed rows: {changedRows}
									</p>
								)}
								{filterStatus === "error" && (
									<p className="text-red-500 mb-3">
										Error occurred while filtering.
									</p>
								)}
							</div>
						</div>
					)}
					<div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
						{isOpen ? (
							<IoIosArrowUp
								onClick={toggleDiv}
								className="text-blue-500 text-4xl transform -translate-y-1/2 cursor-pointer"
							/>
						) : (
							<IoIosArrowDown
								onClick={toggleDiv}
								className="text-blue-500 text-4xl transform -translate-y-1/2 cursor-pointer"
							/>
						)}
					</div>
				</div>

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
