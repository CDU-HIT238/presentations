const studentList = require('./students.json');

function timeToMinutes(timeString) {
	const [hours, minutes] = timeString.split(':');
	return parseInt(hours) * 60 + parseInt(minutes);
}

function minutesToTime(minutes) {
	const hours = Math.floor(minutes/60);
	const remaining = minutes % 60;
	return `${hours}:${remaining < 10 ? `0${remaining}` : remaining}`
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
	return array;
}

const timed = studentList
	.filter((student) => student.time)
	.map((student) => ({...student, mins: timeToMinutes(student.time)}))
	.sort((s1, s2) => s1.mins > s2.mins ? 1 : -1)


const sessionOneStart = timeToMinutes('9:00');
const sessionOneEnd = timeToMinutes('10:30');
const sessionTwoStart = timeToMinutes('10:40');
const sessionTwoEnd = timeToMinutes('12:00');
const sessionThreeStart = timeToMinutes('12:30');
const sessionThreeEnd = timeToMinutes('13:30');

let time = sessionOneStart;
const untimed = shuffleArray(studentList.filter((student) => !student.time))
	.map((student) => {
		time += 5;
		if(time > sessionOneEnd && time < sessionTwoStart) {
			time = sessionTwoStart;
		}
		if(time > sessionTwoEnd && time < sessionThreeStart) {
			time = sessionThreeStart;
		}
		while(timed.findIndex((timedS) => timedS.mins === time) >= 0) {
			time += 5;
			if(time > sessionOneEnd && time < sessionTwoStart) {
				time = sessionTwoStart;
			}
			if(time > sessionTwoEnd && time < sessionThreeStart) {
				time = sessionThreeStart;
			}
		}
		return {...student, mins: time, time: minutesToTime(time)};
	});

const finalSchedule = [...untimed, ...timed]
	.sort((s1, s2) => s1.mins > s2.mins ? 1 : -1);





/*
console.log('Timed', timed);

console.log(untimed);
console.log('Total', studentList.length);
*/


console.log(JSON.stringify(finalSchedule));

