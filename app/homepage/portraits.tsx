export default function Portraits() {
	return (
		<div>
			<div className="bg-black">a</div>
			<div className="flex">
				<div className="flex-1 min-w-0 aspect-[9/10]">
					<img
						src="/self-portraits/a.png"
						className="w-full h-full object-cover object-right"
					/>
				</div>
				<div className="flex-1 min-w-0 aspect-[9/10]">
					<img src="/self-portraits/b.png" className="w-full h-full object-cover" />
				</div>
				<div className="flex-1 min-w-0 aspect-[9/10]">
					<img src="/self-portraits/c.png" className="w-full h-full object-cover" />
				</div>
				<div className="flex-1 min-w-0 aspect-[9/10]">
					<img src="/self-portraits/d.png" className="w-full h-full object-cover" />
				</div>
				<div className="flex-1 min-w-0 aspect-[9/10]">
					<img
						src="/self-portraits/e.png"
						className="w-full h-full object-cover object-left"
					/>
				</div>
			</div>
			<div className="bg-black">a</div>
		</div>
	);
}
