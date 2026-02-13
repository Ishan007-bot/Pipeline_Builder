// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-content">
                {/* IO Section */}
                <span className="toolbar-section-label">I/O</span>
                <div className="toolbar-section">
                    <DraggableNode type='customInput' label='Input' icon='📥' colorClass='node-dot-input' />
                    <DraggableNode type='customOutput' label='Output' icon='📤' colorClass='node-dot-output' />
                </div>

                <div className="toolbar-divider" />

                {/* AI Section */}
                <span className="toolbar-section-label">AI</span>
                <div className="toolbar-section">
                    <DraggableNode type='llm' label='LLM' icon='🧠' colorClass='node-dot-llm' />
                    <DraggableNode type='text' label='Text' icon='📝' colorClass='node-dot-text' />
                </div>

                <div className="toolbar-divider" />

                {/* Logic Section */}
                <span className="toolbar-section-label">Logic</span>
                <div className="toolbar-section">
                    <DraggableNode type='filter' label='Filter' icon='🔍' colorClass='node-dot-filter' />
                    <DraggableNode type='condition' label='Condition' icon='🔀' colorClass='node-dot-condition' />
                    <DraggableNode type='merge' label='Merge' icon='🔗' colorClass='node-dot-merge' />
                </div>

                <div className="toolbar-divider" />

                {/* Integration Section */}
                <span className="toolbar-section-label">Integration</span>
                <div className="toolbar-section">
                    <DraggableNode type='api' label='API Call' icon='🌐' colorClass='node-dot-api' />
                    <DraggableNode type='timer' label='Timer' icon='⏱️' colorClass='node-dot-timer' />
                </div>
            </div>
        </div>
    );
};
