import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mentorshipAreas = [
	{
		icon: Briefcase,
		title: "Career Guidance",
		description:
			"Get advice on internships, placements, and career paths from seniors who've been there",
	},
	{
		icon: GraduationCap,
		title: "Academic Support",
		description:
			"Clear doubts, learn study techniques, and ace your exams with peer mentoring",
	},
	{
		icon: MessageCircle,
		title: "Project Help",
		description:
			"Collaborate on projects, get code reviews, and learn best practices",
	},
	{
		icon: Users,
		title: "Soft Skills",
		description:
			"Improve communication, leadership, and interview skills through peer learning",
	},
];

const Mentorship = () => {
	return (
		<section id="mentorship" className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12 animate-fade-in">
					<h2 className="text-4xl font-bold mb-4">
						Mentorship{" "}
						<span className="bg-gradient-warm bg-clip-text text-transparent">
							Over Chai
						</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Connect with seniors and peers for guidance, support, and knowledge
						sharing in a friendly environment
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
					{mentorshipAreas.map((area, index) => {
						const Icon = area.icon;
						return (
							<Card
								key={index}
								className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<CardContent className="pt-6 space-y-4">
									<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
										<Icon className="w-8 h-8 text-primary-foreground" />
									</div>
									<h3 className="text-xl font-semibold">{area.title}</h3>
									<p className="text-muted-foreground">
										{area.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="space-y-4">
							<h3 className="text-3xl font-bold">How Mentorship Works</h3>
							<div className="space-y-3">
								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
										<span className="text-primary font-bold">1</span>
									</div>
									<div>
										<h4 className="font-semibold mb-1">Browse Mentors</h4>
										<p className="text-muted-foreground text-sm">
											Find seniors or peers with the expertise you need
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
										<span className="text-primary font-bold">2</span>
									</div>
									<div>
										<h4 className="font-semibold mb-1">Schedule Over Chai</h4>
										<p className="text-muted-foreground text-sm">
											Offer a symbolic cup of tea or coffee as appreciation
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
										<span className="text-primary font-bold">3</span>
									</div>
									<div>
										<h4 className="font-semibold mb-1">Learn & Grow</h4>
										<p className="text-muted-foreground text-sm">
											Get guidance, build connections, and pay it forward
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<Card className="bg-gradient-primary p-6 text-primary-foreground">
								<h4 className="text-xl font-bold mb-2">Become a Mentor</h4>
								<p className="mb-4 opacity-90">
									Share your knowledge and help juniors while building your
									reputation
								</p>
								<Link to="/start-mentoring" className="block">
									<Button variant="secondary" className="w-full">
										Start Mentoring
									</Button>
								</Link>
							</Card>
							<Card className="bg-gradient-warm p-6 text-secondary-foreground">
								<h4 className="text-xl font-bold mb-2">Find a Mentor</h4>
								<p className="mb-4 opacity-90">
									Get guidance from experienced seniors in your field
								</p>
								<Link to="/forum" className="block">
									<Button
										variant="outline"
										className="w-full border-2 hover:bg-background"
									>
										Browse Mentors
									</Button>
								</Link>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Mentorship;
