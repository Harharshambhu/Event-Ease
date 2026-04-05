import React from 'react';
import { channelTasks } from '../../data/tasks';

const statusConfig = {
    complete:    { label: 'Done',        cls: 'success' },
    'in-progress': { label: 'In Progress', cls: 'info' },
    pending:     { label: 'Pending',     cls: 'muted' },
    overdue:     { label: 'Overdue',     cls: 'danger' },
};

export default function TasksTab({ channelId }) {
    const tasks = channelTasks[channelId] || [];

    if (tasks.length === 0) {
        return <div className="rsb-tab__empty">No tasks for this channel.</div>;
    }

    return (
        <div className="rsb-tasks">
            <div className="rsb-tasks__count">{tasks.length} tasks</div>
            {tasks.map((task) => {
                const status = statusConfig[task.status] || statusConfig.pending;
                return (
                    <div key={task.id} className="rsb-task-row">
                        <div className="rsb-task-row__assignee" title={task.assignee}>
                            {task.assigneeInitials}
                        </div>
                        <div className="rsb-task-row__info">
                            <div className={`rsb-task-row__name ${task.status === 'complete' ? 'rsb-task-row__name--done' : ''}`}>
                                {task.name}
                            </div>
                            <div className="rsb-task-row__meta">
                                <span className="rsb-task-row__due">◷ {task.due}</span>
                                <span className={`rsb-task-row__status rsb-task-row__status--${status.cls}`}>
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
