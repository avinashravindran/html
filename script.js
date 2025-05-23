// Real-time preview update
const inputs = ['name', 'email', 'phone', 'summary'];
inputs.forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById('p' + id).innerText = document.getElementById(id).value;
    updateProgress();
  });
});

// Skills
document.querySelectorAll('.skill').forEach(skill => {
  skill.addEventListener('change', () => {
    const selected = Array.from(document.querySelectorAll('.skill:checked')).map(s => s.value);
    document.getElementById('pskills').innerHTML = `<h4>Skills</h4> ${selected.join(', ')}`;
    updateProgress();
  });
});

// Add dynamic Education
function addEducation() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Education Detail';
  input.oninput = updateEducation;
  document.getElementById('educationSection').appendChild(input);
}

// Add dynamic Experience
function addExperience() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Experience Detail';
  input.oninput = updateExperience;
  document.getElementById('experienceSection').appendChild(input);
}

// Update Preview for Education
function updateEducation() {
  const inputs = document.querySelectorAll('#educationSection input');
  let content = '<h4>Education</h4>';
  inputs.forEach(i => content += `<p>${i.value}</p>`);
  document.getElementById('peducation').innerHTML = content;
  updateProgress();
}

// Update Preview for Experience
function updateExperience() {
  const inputs = document.querySelectorAll('#experienceSection input');
  let content = '<h4>Experience</h4>';
  inputs.forEach(i => content += `<p>${i.value}</p>`);
  document.getElementById('pexperience').innerHTML = content;
  updateProgress();
}

// Clear Form
function clearForm() {
  document.getElementById('resumeForm').reset();
  document.getElementById('pname').innerText = 'Your Name';
  document.getElementById('pemail').innerText = 'Email';
  document.getElementById('pphone').innerText = 'Phone';
  document.getElementById('psummary').innerText = 'Profile summary here...';
  document.getElementById('peducation').innerHTML = '<h4>Education</h4>';
  document.getElementById('pexperience').innerHTML = '<h4>Experience</h4>';
  document.getElementById('pskills').innerHTML = '<h4>Skills</h4>';
  document.getElementById('progressBar').style.width = '0%';
}

// Progress Bar Calculation
function updateProgress() {
  let filled = 0;
  const total = 6;
  if (document.getElementById('name').value) filled++;
  if (document.getElementById('email').value) filled++;
  if (document.getElementById('phone').value) filled++;
  if (document.getElementById('summary').value) filled++;
  if (document.querySelectorAll('#educationSection input').length > 0) filled++;
  if (document.querySelectorAll('.skill:checked').length > 0) filled++;

  document.getElementById('progressBar').style.width = `${(filled / total) * 100}%`;
}

// PDF Download using jsPDF
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(`Name: ${document.getElementById('name').value}`, 10, 10);
  doc.text(`Email: ${document.getElementById('email').value}`, 10, 20);
  doc.text(`Phone: ${document.getElementById('phone').value}`, 10, 30);
  doc.text(`Summary: ${document.getElementById('summary').value}`, 10, 40);

  let y = 50;
  doc.text("Education:", 10, y);
  document.querySelectorAll('#educationSection input').forEach(input => {
    y += 10;
    doc.text(`- ${input.value}`, 15, y);
  });

  y += 10;
  doc.text("Experience:", 10, y);
  document.querySelectorAll('#experienceSection input').forEach(input => {
    y += 10;
    doc.text(`- ${input.value}`, 15, y);
  });

  y += 10;
  doc.text("Skills:", 10, y);
  const skills = Array.from(document.querySelectorAll('.skill:checked')).map(s => s.value);
  doc.text(skills.join(', '), 15, y + 10);

  doc.save("resume.pdf");
}
