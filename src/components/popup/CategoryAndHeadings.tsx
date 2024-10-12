import { Category } from '@src/types/Category';
import { createSignal, Show } from 'solid-js';

export default function CategoryAndHeadings(props: { category: Category, headings: string[] }) {
    const [expandHeadings, setExpandHeadings] = createSignal(false);
    const toggleExpandHeadings = () => {
        setExpandHeadings(!expandHeadings())
    };

    return (
        <div class="result-item">
            <p>{props.category}</p>
            <button onClick={toggleExpandHeadings} class="expand-button">
                {expandHeadings() ? "Collapse" : "Expand"}
            </button>
            <Show when={expandHeadings()}>
                {props.headings.map(heading => (
                    <p class="details">{heading}</p>
                ))}
            </Show>
        </div>

    );
}