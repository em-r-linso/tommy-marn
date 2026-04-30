import { client } from "@/app/sanity/client";
import { socialLinks } from "@/app/common/footer";
import TiltOnHoverText from "@/app/common/tilt-on-hover-text";
import NavSection from "@/app/common/nav-section";

const rowCellBg = "border-4 border-black";

const donationLinks = [
	{
		href: "https://www.patreon.com/user?u=91562271",
		display: (
			<span className="flex items-center gap-2">
				<img src="/social-icons/patreon.png" alt="Patreon" className="h-[1em]" />
				Become a patron
			</span>
		),
		newTab: true,
	},
	{
		href: "https://www.buymeacoffee.com/thomasmarn",
		display: (
			<span className="flex items-center gap-2">
				<img
					src="/social-icons/buy-me-a-coffee.png"
					alt="Buy me a coffee"
					className="h-[1em]"
				/>
				Buy me a coffee
			</span>
		),
		newTab: true,
	},
];

// tour dates ordered by date ascending, TBD (null date) at end
const QUERY = `*[_type == "tourDate"] | order(coalesce(date, "9999-12-31") asc){
	_id,
	date,
	city,
	venue,
	ticketLink,
	isSoldOut,
	promoText
}`;

export default async function Page() {
	const tourDates = await client.fetch(QUERY);
	return (
		<main>
			{tourDates.length > 0 ? (
				<div className="flex flex-col gap-4 md:grid md:grid-cols-[max-content_max-content_max-content_minmax(0,1fr)] text-lg md:text-xl lg:text-2xl">
					{tourDates.map(
						(tourDate: {
							_id: string;
							date: string | null;
							city: string | null;
							venue: string | null;
							ticketLink: string | null;
							isSoldOut: boolean | null;
							promoText: string | null;
						}) => (
							<div
								key={tourDate._id}
								className={`flex flex-wrap rounded-lg overflow-hidden md:col-span-4 md:grid md:grid-cols-subgrid ${rowCellBg}`}
							>
								<div className="w-fit max-w-full shrink-0 flex flex-col p-4 md:w-auto">
									{tourDate.date ? (
										<>
											<p>
												{new Date(tourDate.date).toLocaleDateString(
													"en-US",
													{
														month: "long",
														day: "numeric",
														year: "numeric",
													},
												)}
											</p>
											<p className="text-sm md:text-md lg:text-lg">
												{new Date(tourDate.date)
													.toLocaleTimeString("en-US", {
														hour: "numeric",
														minute: "2-digit",
													})
													.replace(/ [AP]M$/, "")}
											</p>
										</>
									) : (
										<p>TBD</p>
									)}
								</div>
								<div className="min-w-0 flex-1 flex flex-col p-4 md:w-auto md:flex-none">
									<p>{tourDate.city ?? "TBD"}</p>
									{tourDate.venue ? (
										<p className="text-sm md:text-md lg:text-lg">
											{tourDate.venue}
										</p>
									) : null}
								</div>
								{tourDate.ticketLink ? (
									<a
										href={tourDate.ticketLink}
										target="_blank"
										className="group w-full p-4 text-sm md:w-auto md:text-md lg:text-lg"
									>
										<TiltOnHoverText>
											{tourDate.isSoldOut ? "▶ sold out" : "▶ buy a ticket"}
										</TiltOnHoverText>
									</a>
								) : (
									<p className="w-full p-4 text-sm md:w-auto md:text-md lg:text-lg">
										{tourDate.isSoldOut ? "▶ sold out" : null}
									</p>
								)}
								<p className="w-full p-4 text-sm md:w-auto md:text-md lg:text-lg">
									{tourDate.promoText}
								</p>
							</div>
						),
					)}
				</div>
			) : (
				<div className="flex flex-col items-start gap-6">
					<p className="text-2xl">
						I&apos;m not touring right now, but you can follow me to be the first to
						know when I am!
					</p>
					<NavSection links={socialLinks} />
				</div>
			)}
			<div className="flex flex-col gap-4 mt-10">
				<p>Help me get the gear I need for live shows!</p>
				<NavSection links={donationLinks} />
				<p>
					As a solo, independent musician, I have limited funds for touring. Your
					donations will help me purchase the equipment I need, and cover other
					tour-related expenses. Donations are never expected, but always appreciated (no
					matter how big or small) Your support helps me make high-quality live-shows a
					reality, and allows me to continue creating and sharing music!
				</p>
				<p>Thank you so much!!</p>
			</div>
		</main>
	);
}
