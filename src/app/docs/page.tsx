import { Counter } from '@/components/counter';
import { title } from 'src/components/primitives';

export default function DocsPage() {
    return (
        <div>
            <h1 className={title({fullWidth: true})}>Docs</h1>
            <Counter/>
        </div>
    );
}
