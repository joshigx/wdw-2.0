export default function HeaderFooter({title: title}: {title: string}) {
    return (
        <>
            <h1>{title ? title : "Default Title"}</h1>
        </>
    );
}
