$(document).ready(function() {
    let tasktext = $('#task');
    let btn = $('#add-btn');
    let tasklist = $('#task-list');

    loadTask();

    btn.on('click', function() {
        let taskText = tasktext.val().trim();
        if (taskText === '') {
            alert('Please enter a task, this is empty');
            return;
        }

        let taskitem = $('<li>');
        let checkbox = $('<input type="checkbox">');
        let label = $('<label>').text(taskText);
        let deletebtn = $('<button>').text('Delete Task');

        checkbox.on('change', function() {
            if (checkbox.is(':checked')) {
                label.css('text-decoration', 'line-through');
            } else {
                label.css('text-decoration', 'none');
            }
            saveinLocal();
        });

        deletebtn.on('click', function() {
            taskitem.remove();
            saveinLocal();
        });

        taskitem.append(checkbox);
        taskitem.append(label);
        taskitem.append(deletebtn);
        tasklist.append(taskitem);
        tasktext.val('');
        saveinLocal();
    });

    function saveinLocal() {
        let tasks = [];
        tasklist.find('li').each(function() {
            let item = $(this);
            let task = {
                text: item.find('label').text(),
                status: item.find('input').is(':checked')
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTask() {
        let savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            let tasks = JSON.parse(savedTasks);
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                let taskitem = $('<li>');
                let checkbox = $('<input type="checkbox">');
                let label = $('<label>').text(task.text);
                let deletebtn = $('<button>').text('Delete Task');

                if (task.status) {
                    checkbox.prop('checked', true);
                    label.css('text-decoration', 'line-through');
                }

                checkbox.on('change', function() {
                    if (checkbox.is(':checked')) {
                        label.css('text-decoration', 'line-through');
                    } else {
                        label.css('text-decoration', 'none');
                    }
                    saveinLocal();
                });

                deletebtn.on('click', function() {
                    taskitem.remove();
                    saveinLocal();
                });

                taskitem.append(checkbox);
                taskitem.append(label);
                taskitem.append(deletebtn);
                tasklist.append(taskitem);
            }
        }
    }
});
