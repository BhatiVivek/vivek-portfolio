<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AI Knowledge Platform - Learning Roadmap</title>

<style>
body {
    font-family: Arial, sans-serif;
    background: #f5f7fb;
    margin: 0;
    padding: 20px;
    color: #222;
}

.container {
    max-width: 1200px;
    margin: auto;
}

h1 {
    text-align: center;
}

.subtitle {
    text-align: center;
    color: #555;
}

.progress-box {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin: 20px 0;
}

.progress-bar {
    width: 100%;
    height: 25px;
    background: #ddd;
    border-radius: 20px;
    overflow: hidden;
}

.progress {
    height: 100%;
    width: 0%;
    background: #4caf50;
    text-align: center;
    color: white;
}

.phase {
    background: white;
    margin: 20px 0;
    padding: 25px;
    border-radius: 12px;
}

.phase h2 {
    color: #1a73e8;
}

.section-title {
    font-weight: bold;
    margin-top: 15px;
}

ul {
    line-height: 1.8;
}

.tech {
    display: inline-block;
    background: #eef3ff;
    padding: 5px 10px;
    margin: 4px;
    border-radius: 15px;
}

.task {
    margin: 8px 0;
}

input[type="checkbox"] {
    transform: scale(1.2);
}

.notes {
    width: 100%;
    min-height: 80px;
}

footer {
    text-align:center;
    margin-top:40px;
    color:#777;
}

</style>

</head>

<body>

<div class="container">

<h1>🚀 AI Knowledge Platform Roadmap</h1>

<p class="subtitle">
Goal: Become AI Application Engineer / AI Platform Engineer by building
a production-style cloud native AI platform.
</p>


<div class="progress-box">

<h2>Overall Progress</h2>

<div class="progress-bar">
<div id="progress" class="progress">0%</div>
</div>

<p id="progressText"></p>

</div>


<div class="phase">

<h2>Phase 0 - Architecture & Planning (Week 1)</h2>

<p>
Create the blueprint before writing code.
</p>

<div class="section-title">
Implement:
</div>

<ul>
<li class="task"><input type="checkbox"> Define complete system architecture</li>
<li class="task"><input type="checkbox"> Create service boundaries</li>
<li class="task"><input type="checkbox"> Create API contracts</li>
<li class="task"><input type="checkbox"> Create database design</li>
<li class="task"><input type="checkbox"> Create ADR documents</li>
</ul>

<div class="section-title">
Tech Stack:
</div>

<span class="tech">Draw.io</span>
<span class="tech">Markdown</span>
<span class="tech">OpenAPI</span>


<div class="section-title">
Outcome:
</div>

<p>
Think like an architect before implementation.
</p>

</div>



<div class="phase">

<h2>Phase 1 - AWS Infrastructure using Terraform (Weeks 2-3)</h2>

<p>
Build the foundation like an enterprise project.
</p>

<div class="section-title">Repository:</div>

<pre>
portfolio-infra
</pre>

<div class="section-title">
Implement:
</div>

<ul>
<li class="task"><input type="checkbox"> Terraform provider setup</li>
<li class="task"><input type="checkbox"> AWS VPC</li>
<li class="task"><input type="checkbox"> Public/private subnets</li>
<li class="task"><input type="checkbox"> Security groups</li>
<li class="task"><input type="checkbox"> PostgreSQL RDS</li>
<li class="task"><input type="checkbox"> Secrets Manager</li>
<li class="task"><input type="checkbox"> IAM roles</li>
<li class="task"><input type="checkbox"> CloudWatch monitoring</li>
</ul>


<div class="section-title">Tech Stack:</div>

<span class="tech">Terraform</span>
<span class="tech">AWS VPC</span>
<span class="tech">AWS RDS</span>
<span class="tech">IAM</span>
<span class="tech">CloudWatch</span>


<div class="section-title">
Learning:
</div>

<ul>
<li>Infrastructure as Code</li>
<li>Cloud networking</li>
<li>Enterprise AWS setup</li>
</ul>

</div>



<div class="phase">

<h2>Phase 2 - Identity Service (Weeks 4-5)</h2>


<div class="section-title">
Goal:
</div>

<p>
Enterprise authentication using AWS Cognito.
</p>


<div class="section-title">
Implement:
</div>

<ul>

<li class="task"><input type="checkbox"> Cognito User Pool</li>
<li class="task"><input type="checkbox"> Login flow</li>
<li class="task"><input type="checkbox"> JWT validation</li>
<li class="task"><input type="checkbox"> User profile management</li>
<li class="task"><input type="checkbox"> RBAC permissions</li>

</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">Node.js</span>
<span class="tech">TypeScript</span>
<span class="tech">Express</span>
<span class="tech">AWS Cognito</span>
<span class="tech">PostgreSQL</span>
<span class="tech">Prisma</span>


</div>




<div class="phase">

<h2>Phase 3 - AI News Service (Weeks 6-7)</h2>


<div class="section-title">
Goal:
</div>

<p>
Convert existing AI news pipeline into a production service.
</p>


<div class="section-title">
Implement:
</div>

<ul>
<li class="task"><input type="checkbox"> RSS crawler</li>
<li class="task"><input type="checkbox"> Duplicate detection</li>
<li class="task"><input type="checkbox"> AI summarization</li>
<li class="task"><input type="checkbox"> Categorization</li>
<li class="task"><input type="checkbox"> Generate embeddings</li>
</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">Node.js</span>
<span class="tech">Python</span>
<span class="tech">OpenAI API</span>
<span class="tech">MongoDB</span>


</div>




<div class="phase">

<h2>Phase 4 - Search Service (Weeks 8-10)</h2>

<p>
Build enterprise autocomplete and semantic search.
</p>


<div class="section-title">
Implement:
</div>

<ul>
<li class="task"><input type="checkbox"> Trie autocomplete</li>
<li class="task"><input type="checkbox"> Prefix ranking</li>
<li class="task"><input type="checkbox"> Search history</li>
<li class="task"><input type="checkbox"> Redis caching</li>
<li class="task"><input type="checkbox"> Vector search</li>
</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">Trie</span>
<span class="tech">Redis</span>
<span class="tech">PostgreSQL</span>
<span class="tech">Vector Database</span>


</div>




<div class="phase">

<h2>Phase 5 - Analytics Service (Weeks 11-12)</h2>


<div class="section-title">
Implement:
</div>

<ul>
<li class="task"><input type="checkbox"> Event tracking</li>
<li class="task"><input type="checkbox"> User analytics</li>
<li class="task"><input type="checkbox"> Search analytics</li>
<li class="task"><input type="checkbox"> AI usage analytics</li>
</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">PostgreSQL</span>
<span class="tech">Redis</span>
<span class="tech">Event Driven Architecture</span>


</div>




<div class="phase">

<h2>Phase 6 - AI Service (Weeks 13-16)</h2>


<div class="section-title">
Goal:
</div>

<p>
Move beyond simple OpenAI API calls.
</p>


<div class="section-title">
Implement:
</div>

<ul>

<li class="task"><input type="checkbox"> RAG pipeline</li>
<li class="task"><input type="checkbox"> Embeddings</li>
<li class="task"><input type="checkbox"> Vector database</li>
<li class="task"><input type="checkbox"> AI Agents</li>
<li class="task"><input type="checkbox"> Tool calling</li>
<li class="task"><input type="checkbox"> Memory</li>
<li class="task"><input type="checkbox"> AI evaluation</li>

</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">Python</span>
<span class="tech">FastAPI</span>
<span class="tech">LangGraph</span>
<span class="tech">OpenAI Agents SDK</span>
<span class="tech">Qdrant</span>


</div>




<div class="phase">

<h2>Phase 7 - Event Driven Architecture (Weeks 17-18)</h2>


<div class="section-title">
Implement:
</div>

<ul>

<li class="task"><input type="checkbox"> Event publishing</li>
<li class="task"><input type="checkbox"> Async processing</li>
<li class="task"><input type="checkbox"> Background workers</li>

</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">RabbitMQ</span>
<span class="tech">Kafka</span>
<span class="tech">Redis Streams</span>


</div>




<div class="phase">

<h2>Phase 8 - Deployment & DevOps (Weeks 19-22)</h2>


<div class="section-title">
Implement:
</div>

<ul>

<li class="task"><input type="checkbox"> Docker containers</li>
<li class="task"><input type="checkbox"> CI/CD pipelines</li>
<li class="task"><input type="checkbox"> AWS deployment</li>
<li class="task"><input type="checkbox"> Monitoring</li>

</ul>


<div class="section-title">
Tech Stack:
</div>

<span class="tech">Docker</span>
<span class="tech">GitHub Actions</span>
<span class="tech">AWS ECS</span>


</div>



<div class="phase">

<h2>Final Notes</h2>

<textarea class="notes" placeholder="Add your learning notes here..."></textarea>

</div>


<footer>
AI Knowledge Platform - Vivek Bhati Learning Roadmap
</footer>


</div>


<script>

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");


checkboxes.forEach(box => {

    box.addEventListener("change", updateProgress);

});


function updateProgress(){

    let completed = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    ).length;


    let total = checkboxes.length;

    let percentage = Math.round(
        (completed / total) * 100
    );


    progress.style.width = percentage + "%";
    progress.innerHTML = percentage + "%";

    progressText.innerHTML =
    completed + " completed out of " + total;

}


updateProgress();

</script>


</body>
</html>