/* ============================================================
   PORTFOLIO CONFIGURATION & DATA
   Contact links, Tech Skills, Code Snippets & Resume Info
   ============================================================ */

export const CONFIG = {
  links: {
    email: "irfanmohamed1182005@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohamedirfan58",
    github: "https://github.com/irfan1123202",
    phone: "+918825464756",
    pollifyLive: "",  // Live demo URL (optional)
    pollifyRepo: ""   // GitHub repository URL (optional)
  }
};

export const RESUME_FILENAME = "Mohamed_Irfan_Resume.pdf";
export const RESUME_PDF_PATH = "assets/resume/Mohamed_Irfan_Resume.pdf";

export const ROLE_TEXT = "Full Stack Developer & AI Enthusiast";

/* Tech Universe Skills: [CategoryKey, CategoryLabel, [[SkillName, SVGIconId, SkillDescription], ...]] */
export const TECH_STACK = [
  ['fe', 'Frontend', [
    ['HTML', 'i-html5', 'Structures every page I build'],
    ['CSS', 'i-css3', 'Styling, layout and responsive design'],
    ['JavaScript', 'i-js', 'Interactive logic in the browser'],
    ['Bootstrap', 'i-bootstrap', 'Fast, responsive UI components']
  ]],
  ['be', 'Backend', [
    ['Python', 'i-python', 'My core backend language'],
    ['Flask', 'i-flask', 'Lightweight APIs and routing'],
    ['REST APIs', 'i-api', 'Connecting frontend to backend']
  ]],
  ['ml', 'Data & ML', [
    ['Pandas', 'i-pandas', 'Cleaning and analyzing data'],
    ['NumPy', 'i-numpy', 'Numerical computing'],
    ['Matplotlib', 'i-matplotlib', 'Plotting and visualizing data'],
    ['Scikit-learn', 'i-sklearn', 'Building ML models']
  ]],
  ['db', 'Database', [
    ['SQL', 'i-db', 'Querying relational data'],
    ['MySQL', 'i-db', 'Relational database design'],
    ['MongoDB', 'i-mongodb', 'Flexible NoSQL storage'],
    ['SQLite', 'i-db', 'Lightweight local databases']
  ]],
  ['tl', 'Tools', [
    ['Git', 'i-git', 'Version control for every project'],
    ['GitHub', 'i-github', 'Hosting and collaborating on code'],
    ['VS Code', 'i-vscode', 'My daily code editor'],
    ['Postman', 'i-postman', 'Testing and debugging APIs'],
    ['Jupyter', 'i-jupyter', 'Prototyping and data notebooks']
  ]]
];

/* Live Code displayed on the interactive center monitor */
export const CODE_SNIPPET = [
  'from flask import Flask, jsonify, request',
  '',
  'app = Flask(__name__)',
  '',
  '# GreenBot: answer a visitor question',
  '@app.route("/ask", methods=["POST"])',
  'def ask():',
  '    question = request.json["question"]',
  '    answer = knowledge_base.search(question)',
  '    return jsonify({"answer": answer})',
  '',
  'if __name__ == "__main__":',
  '    app.run(debug=True)'
].join('\n');
