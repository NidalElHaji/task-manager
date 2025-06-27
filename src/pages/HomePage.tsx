import { Briefcase, Code } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/buttons/Button";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-blue-50">
            <header className="w-full bg-blue-800 text-white py-4 shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">
                        Welcome to My Code Showcase
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <Card.Header>
                        <Card.Title className="text-2xl font-semibold text-blue-800">
                            For Technical Interviewer
                        </Card.Title>
                    </Card.Header>
                    <Card.Content className="text-gray-700">
                        <p className="mb-4">
                            This application is designed to give you a
                            transparent view of my skills and expertise as a
                            developer. Feel free to explore the following:
                        </p>
                        <ul className="list-disc list-inside mb-6">
                            <li>Code Examples</li>
                            <li>Task Management Features</li>
                            <li>Clean, Maintainable, and Scalable Designs</li>
                        </ul>
                        <p className="mb-6">
                            I have built this platform to demonstrate my
                            capabilities in modern front-end development,
                            focusing on user-friendly design and functionality.
                            Please review my work and reach out with any
                            questions or feedback.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://www.linkedin.com/in/nidal-el-haji-93893b162/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button>
                                    <Briefcase className="inline-block mr-2" />
                                    Learn More About Me
                                </Button>
                            </a>
                            <a
                                href="https://github.com/NidalElHaji"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green400">
                                    <Code className="inline-block mr-2" />
                                    View My Code
                                </Button>
                            </a>
                        </div>
                    </Card.Content>
                </Card>
            </main>
        </div>
    );
};

export default HomePage;
