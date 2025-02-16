import PollForm from "@/components/PollForm";
import PollList from "@/components/PollList";

export default function Home() {
    return (
        <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
            <PollForm />
            <PollList />
        </div>
    );
}
