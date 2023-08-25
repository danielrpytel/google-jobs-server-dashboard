import moment from "moment";
import { IDetails_Job_Posting } from "../interfaces/Job_Posting_data";

function JobPostingDetails(props: { jobData: IDetails_Job_Posting }) {
	const momentDate = moment(props.jobData.inserted_date);
	const stringDate = momentDate.format("MMMM Do YYYY");

	// In text change /n into new lines logic
	const descriptionLines = props.jobData.description
		.split("\n")
		.map((paragraph, index) => {
			const paragraphClassName =
				paragraph.trim() === "" ? "empty-paragraph" : "";

			return (
				<p key={index} className={paragraphClassName}>
					{paragraph}
				</p>
			);
		});
	return (
		<div className="w-screen max-h-[calc(100vh-5.1rem)] bg-slate-800 overflow-auto">
			<div className="flex flex-col text-gray-300 text-lg m-5">
				<div className="text-5xl mb-5">{props.jobData.title}</div>
				<div className="text-3xl mb-2">{props.jobData.company_name}</div>
				<div className="text-3xl mb-2">{props.jobData.location}</div>
				<div className="text-3xl ">{stringDate}</div>
				<div className="my-5">{descriptionLines}</div>
			</div>
		</div>
	);
}

export default JobPostingDetails;
