export default function EditHostPage({ params }: { params: { id: string } }) {
    return (<div>My Post: {params.id}</div>);
}