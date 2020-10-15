

function populateScheduleList() {
	return fetch('./sorted.json')
		.then((response) => response.json())
		.then((studentList) => {
			const html = studentList
				.map(({name, href, time}) => `<li><a href="${href}">${time}: ${name}</li>`)
				.join('');
			document.getElementById('scheduleList').innerHTML = html;
		});
}

populateScheduleList();
