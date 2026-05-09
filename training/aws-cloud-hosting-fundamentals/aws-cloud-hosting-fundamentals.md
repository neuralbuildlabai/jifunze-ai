# Cloud Hosting Fundamentals with AWS — A 60-Minute Beginner Course

> **Status:** Draft v0.2 — fixes applied based on the factual accuracy and publish readiness review. Supersedes the three earlier files at the repository root (`AWS_Cloud_Hosting_Fundamentals_Course.md`, `AWS_COURSE_FULL_CONTENT_GUIDE.md`, `AWS_Cloud_Hosting_Fundamentals_Complete_Course.md`). All 28 slides present with full content, speaker notes, and visual instructions.
>
> **Last pricing review: May 9, 2026.** Pricing examples are illustrative and based on public AWS pricing pages and common US-region assumptions at the time of this review. **AWS prices vary by region, instance family, bundle, usage, architecture, and date. Always verify current AWS pricing on the official AWS pricing pages before making decisions or purchases.** When this course is republished, update this date and re-verify the figures.
>
> **Open editorial items still to address before publishing:**
> 1. Slide 3 enterprise-cloud-adoption wording is now general ("the vast majority of enterprises"). If you want a hard percentage, source it from Flexera State of the Cloud (latest year) and cite it inline.
> 2. Slide 6 cloud market share wording is now general ("the largest of the major cloud providers"). If you want hard percentages, source from Synergy Research or Canalys (latest quarter) and cite the quarter inline.
> 3. Pathway decision still open: keep this as a single 60-minute course, or split into a 4-module short pathway. See the "Publishing decision" note at the end of the file.

---

## Course Summary

**Target Learner:** Entrepreneurs, small business owners, beginner developers, students, and non-technical professionals who want to understand AWS and cloud hosting

**Duration:** 50–60 minutes (28 slides at a normal narration pace, with reflection time)

**Level:** Beginner (no prior cloud or technical knowledge required)

**Main Promise:** By the end of this course, you'll understand what cloud hosting is, how AWS works, and how to make informed decisions about hosting your website, app, or business platform in the cloud.

**What You'll Understand:**
- The fundamental difference between traditional and cloud hosting
- What AWS is and why businesses use it
- The core AWS services for hosting (compute, storage, databases, networking)
- How scalability, availability, and security work in the cloud
- Real-world hosting scenarios with cost examples
- How to choose the right hosting approach for your needs
- Common mistakes to avoid and best practices to follow

---

## Slide Deck (28 slides)

### Slide 1: Title Slide

**Estimated Time:** 0.5 minutes

**Slide Content:**
- **Cloud Hosting Fundamentals with AWS**
- A 60-Minute Beginner Course
- Learn how modern businesses host websites and applications in the cloud

**Visual / Diagram Instruction:**
Clean, modern title slide with a subtle cloud icon or abstract network graphic in the background. Use a professional color palette (deep blue, white, with accent colors like orange or teal). Include the Jifunze.ai logo in the corner.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Welcome to Cloud Hosting Fundamentals with AWS. This course is designed for anyone who wants to understand how modern businesses host their websites, applications, and platforms in the cloud. Whether you're an entrepreneur planning to launch a website, a business owner evaluating hosting options, or simply curious about how cloud computing works, this course will give you the foundational knowledge you need. Over the next 60 minutes, we'll break down complex concepts into simple, practical explanations. By the end, you'll be able to make informed decisions about cloud hosting for your own projects.

**Learner Check / Reflection:**
None.

---

### Slide 2: What You'll Be Able to Do

**Estimated Time:** 1 minute

**Slide Content:**
- **By the end of this course, you'll be able to:**
- Explain what cloud hosting is and why it matters
- Understand the core AWS services used for hosting
- Compare different hosting options for websites and apps
- Estimate basic hosting costs for simple projects
- Identify the right AWS services for common business scenarios
- Avoid common beginner mistakes when choosing cloud hosting

**Visual / Diagram Instruction:**
Use a checklist-style layout with checkmark icons next to each bullet point. Keep the design clean and aspirational.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Let's set clear expectations for what you'll gain from this course. This isn't about becoming an AWS expert overnight — it's about building a solid foundation. You'll learn to speak the language of cloud hosting, understand the key services businesses use, and make smart decisions when it's time to host your own website or application. You'll also learn to estimate costs, which is crucial for budgeting. Most importantly, you'll understand the "why" behind cloud hosting decisions, not just the "what." This practical knowledge will help you whether you're building something yourself or working with developers and IT professionals.

**Learner Check / Reflection:**
Think about your current goal: Are you planning to launch a website, migrate an existing site, or simply understand how cloud hosting works?

---

### Slide 3: Why Cloud Hosting Matters Today

**Estimated Time:** 1.5 minutes

**Slide Content:**
- **The Modern Business Reality:**
- The vast majority of enterprises now use cloud services in some form
- Cloud hosting enables businesses to start small and scale globally
- Traditional hosting typically requires upfront hardware investment
- Cloud hosting offers flexibility: pay only for what you use
- **Real Impact:** Launch a website in minutes, not weeks

**Visual / Diagram Instruction:**
Show a simple before/after comparison. Left side: traditional server room with physical hardware. Right side: cloud icon with global connectivity. Use icons to represent speed, flexibility, and cost savings.

**Chart / Data Instruction:**
Optional callout: "Cloud is now the default for new business workloads" in a highlighted box. *(If you want to publish a hard percentage, source it from the latest Flexera State of the Cloud report and cite the year.)*

**Speaker Notes:**
Cloud hosting has fundamentally changed how businesses operate online. A couple of decades ago, if you wanted to host a website or application, you typically needed to buy physical servers, set up a server room, hire IT staff, and invest thousands of dollars upfront — even before your first customer visited your site. Today, cloud hosting allows anyone to launch a professional website or application in minutes, with entry-level costs starting in the single dollars per month. You only pay for the resources you actually use, and you can scale up or down based on demand. This shift means a small startup can now access infrastructure of the same general kind that powers companies like Netflix, Airbnb, or major banks. That's why the vast majority of enterprises now use cloud services in some form, and why cloud is the default for most new business workloads. Understanding cloud hosting isn't just useful — it's essential for anyone building or running a modern business.

**Learner Check / Reflection:**
Action prompt: think of one project (yours or someone else's) and write down two reasons it would benefit from a "start small, pay only for what you use" hosting model — and one reason it might not.

---

### Slide 4: Traditional Hosting vs Cloud Hosting

**Estimated Time:** 2 minutes

**Slide Content:**
- **Comparison Table:**

| Aspect | Traditional Hosting | Cloud Hosting |
|--------|-------------------|---------------|
| **Setup Time** | Days to weeks | Minutes to hours |
| **Upfront Cost** | $5,000–$50,000+ | $0–$100 to start |
| **Scalability** | Buy new hardware | Scale instantly |
| **Maintenance** | You manage everything | Provider manages infrastructure |
| **Payment Model** | Fixed monthly cost | Pay-as-you-go |
| **Reliability** | Single point of failure | Multiple redundant systems |

**Visual / Diagram Instruction:**
Create a clean comparison table with two columns. Use contrasting colors to highlight the differences. Add small icons for each row (clock for time, dollar sign for cost, etc.).

**Chart / Data Instruction:**
The table above contains the chart data.

**Speaker Notes:**
Let's compare traditional hosting with cloud hosting to understand the fundamental shift. Traditional hosting means you rent or own physical servers in a specific location. If you need more capacity, you have to buy more hardware — which takes time and money. You're also responsible for maintenance, security updates, and backups. If your server fails, your website goes down until it's fixed. Cloud hosting works differently. Instead of physical servers you manage, you use virtual resources provided by companies like AWS. Setup is fast — often just minutes. You start small and scale up as needed, paying only for what you use. The cloud provider handles infrastructure maintenance, and your application runs across multiple redundant systems, so if one fails, others take over automatically. For a small business website, traditional hosting might cost $100–$500 per month with fixed capacity. Cloud hosting might start at $10–$50 per month and scale up only when you need it. This flexibility is why most new businesses choose cloud hosting.

**Learner Check / Reflection:**
Which model sounds more suitable for a startup with unpredictable traffic?

---

### Slide 5: What Is Cloud Computing? (Simple Definition)

**Estimated Time:** 1.5 minutes

**Slide Content:**
- **Cloud computing in one sentence:**
- *Renting computing resources over the internet, on demand, paying only for what you use.*
- **The four properties that make it "cloud":**
  - On demand — turn it on in minutes, off when you're done
  - Over the internet — no physical hardware to install
  - Pay-as-you-go — billed by the hour, the gigabyte, or the request
  - Elastic — grows and shrinks with your demand
- **Everyday analogy:** It's the difference between owning a car and using a ride-share app — both get you somewhere, but the cost model and the responsibilities are completely different.

**Visual / Diagram Instruction:**
Show a side-by-side analogy graphic: a car icon labelled "Own a car (traditional)" with monthly fixed costs (insurance, maintenance, parking) on one side, and a ride-share icon labelled "Use a ride (cloud)" with per-trip costs on the other. Add the four "cloud properties" as small icons across the bottom of the slide.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Before we talk about AWS specifically, let's make sure the term "cloud computing" is concrete in your mind. Cloud computing is, very simply, renting computing resources over the internet, on demand, paying only for what you use. That definition might sound abstract, so let's break it into four properties that have to be true for something to count as "cloud." First, on demand — you can spin up a server in minutes and turn it off when you're done. You don't have to call a sales rep, sign a contract, or wait for delivery. Second, it happens over the internet — the resources you're using are physically in someone else's data center, but you access them through a web browser, an app, or an API. Third, pay-as-you-go — you're billed by the hour for compute, by the gigabyte for storage, by the request for serverless functions. There's no flat monthly fee for a server you're not using. Fourth, elastic — your usage can grow and shrink with your demand, automatically. The car versus ride-share analogy is the most useful one I know. Owning a car has fixed monthly costs whether you drive or not — insurance, maintenance, parking, depreciation. A ride-share has zero fixed cost and you pay per trip. Cloud computing is the ride-share model for computing infrastructure. You don't pay for capacity you're not using, and you can scale up to a fleet of vehicles in minutes if your demand spikes.

**Learner Check / Reflection:**
Of the four properties — on demand, over the internet, pay-as-you-go, elastic — which one sounds most valuable for a project you're working on?

---

### Slide 6: What Is AWS?

**Estimated Time:** 2 minutes

**Slide Content:**
- **AWS = Amazon Web Services**
- Launched in 2006 by Amazon — the first major commercial cloud platform
- Today: 200+ services, used by millions of customers in 240+ countries
- **What AWS provides:**
  - Compute (servers you can rent by the hour)
  - Storage (somewhere to put files and data)
  - Databases (managed places to store structured data)
  - Networking (the wiring between everything)
  - Plus security, monitoring, AI, machine learning, analytics, and much more
- **Why it matters:** AWS is the largest of the major cloud providers by market share, ahead of Microsoft Azure and Google Cloud. The exact split shifts each quarter — what matters for this course is that AWS is large, mature, and unusually well-documented for beginners.

**Visual / Diagram Instruction:**
A simple two-column layout. Left: "AWS at a glance" with three or four headline facts (founded 2006, 200+ services, available in many countries and regions, market leader). Right: a clean grid of four icons representing the four core service categories — compute, storage, databases, networking. Use the official AWS service icons if licensed; otherwise use neutral generic icons.

**Chart / Data Instruction:**
Optional bar chart showing the relative size of the major cloud providers (AWS, Microsoft Azure, Google Cloud, and "all others"). *Use general "larger / smaller" sizing rather than exact percentages, or source the latest Synergy Research / Canalys quarterly report and cite the quarter on the slide.*

**Speaker Notes:**
AWS stands for Amazon Web Services. It's the cloud platform owned and operated by Amazon, and it launched in 2006. It's worth knowing the history because it explains why AWS is the way it is. Amazon, the retailer, had to build massive computing infrastructure to run their own e-commerce business. They realised that they were quite good at building and operating data centers, and that other businesses might want to rent that infrastructure rather than build their own. AWS was the result. Today AWS has more than 200 distinct services and is used by everyone from individual hobbyists to global enterprises like Netflix, Airbnb, NASA, and most major banks. It operates in many countries and is, by most market share measures, the largest of the major cloud providers — ahead of Microsoft Azure and Google Cloud, with the remaining share split between providers like Oracle, IBM, Alibaba, and a long tail of regional clouds. The exact split shifts each quarter, so don't get attached to a specific number — what matters for this course is that AWS is the largest, the most mature, and the most well-documented for beginners. For this course, you don't need to know all 200 services — you need to know about ten or twelve. We'll cover the most important ones in the next few slides. The reason AWS is the right starting point for learning cloud is partly because of its size — there are more tutorials, more community knowledge, and more documentation than for any other platform — and partly because the core concepts you learn on AWS map cleanly to Azure or Google Cloud if you ever switch.

**Learner Check / Reflection:**
Have you ever used a service that was running on AWS without realising it? (Most people have — Netflix, Airbnb, Pinterest, and Reddit all run on AWS.)

---

### Slide 7: The Basic Cloud Hosting Building Blocks

**Estimated Time:** 2 minutes

**Slide Content:**
- **Every hosted website or app needs four things:**
  1. **Compute** — somewhere for your code to run
  2. **Storage** — somewhere to put files and data
  3. **Database** — somewhere to store structured information
  4. **Networking** — the connections between everything, and the path to your users
- **Plus three supporting services for any serious project:**
  - **Security** — who can access what
  - **Monitoring** — alerts when something breaks
  - **Backups** — what to do when something goes wrong anyway
- **The next 8 slides walk through each of these in plain English.**

**Visual / Diagram Instruction:**
A four-block diagram showing the request flow: "User's browser → Networking → Compute → Database / Storage → Response back to user." Add three small icons below for the supporting services (Security, Monitoring, Backups) labelled "Always on in the background."

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Before we look at specific AWS services, let's establish a mental model for what every hosted website or application actually needs. Strip away the brand names, and every system on the internet is built from the same four building blocks. First, compute — a place where your code runs. This could be a virtual server, a serverless function, or a container. Without compute, your code is just sitting in a file somewhere. Second, storage — a place to put files. Images, videos, backups, log files, software downloads — anything that lives as a file goes in storage. Third, a database — a place to store structured data that your application reads and writes constantly. User accounts, blog posts, orders, inventory — that lives in a database. Fourth, networking — the wiring that connects all of these things to each other and to your users. When someone types your website's address, networking is what gets their request to your server and gets the response back. Beyond those four core building blocks, there are three supporting services any serious project needs. Security — who is allowed to access what, and how. Monitoring — automated alerts when something is going wrong. And backups — your insurance policy when something fails or someone makes a mistake. Over the next eight slides, we'll go through each of these one at a time, using plain English and real cost examples. By the end of slide fifteen, you'll have a working mental map of the AWS services that matter most for hosting.

**Learner Check / Reflection:**
For a website you've used or built, can you name where the compute, storage, database, and networking parts probably live?

---

### Slide 8: Compute Explained (EC2, Lightsail, Lambda, Containers)

**Estimated Time:** 3 minutes

**Slide Content:**
- **Compute = somewhere for your code to run.** AWS gives you four main flavours.
- **EC2 (Elastic Compute Cloud)** — virtual servers you control completely. Choose the size, the operating system, what software runs on it. Small EC2 instances can cost only a few dollars to around $15/month before storage, data transfer, and optional services, depending on family, size, region, architecture, and usage hours. Large instances cost much more. *Approximate, region- and usage-dependent — verify before deployment.*
- **Lightsail** — a simplified, beginner-friendly version of EC2. Pre-configured bundles for WordPress, LAMP, Node.js, etc. Lightsail bundles can start around **$3.50–$5/month** depending on whether you choose an IPv6-only or public-IPv4 bundle, the bundle size, the region, and current AWS pricing. *Approximate, region- and bundle-dependent — verify before purchase.*
- **Lambda (serverless)** — run a piece of code in response to an event. No server to manage. You pay per request and per millisecond of execution. The free tier covers 1 million requests per month.
- **Containers (ECS / EKS / Fargate)** — run packaged applications on AWS-managed infrastructure. Used by larger teams and more complex apps.
- **Rule of thumb:** start with **Lightsail** for simple sites, **EC2** if you need full control, **Lambda** for occasional tasks, **containers** when your team is comfortable with Docker.
- **Reading EC2 instance names:** in names like *t3.small* or *t4g.nano*, the first part (*t3*, *t4g*) is the instance family and generation, and the last part (*small*, *nano*, *medium*) is the size. Larger sizes cost more.

**Visual / Diagram Instruction:**
A 2×2 grid showing each compute option with: an icon, a one-line "best for" description, and an *approximate* starting monthly price range. EC2 — full control, from a few dollars per month for tiny instances. Lightsail — easiest for beginners, bundles starting roughly $3.50–$5/month depending on bundle and region. Lambda — serverless, pay per request. Containers — packaged apps, varies. **Caption every price as "approximate, verify on official AWS pricing pages."** Highlight Lightsail as the recommended starting point for most beginners.

**Chart / Data Instruction:**
Optional bar chart showing *approximate, illustrative* monthly cost ranges for each option for a small business workload: Lightsail roughly $3.50–$20, EC2 roughly $10–$60, Lambda roughly $0–$5 (light use), containers roughly $30–$150. **Region- and usage-dependent. Verify before deployment.**

**Speaker Notes:**
Compute is the part of cloud hosting where your code actually runs. AWS gives you four main ways to do this, and the right choice depends on how much control you want, how much you want to manage, and what kind of workload you have. Let's go through them in order from most beginner-friendly to most flexible. First, Lightsail. Lightsail is AWS's simplified hosting service, designed specifically for people who don't want to learn the full AWS console. You pick a pre-configured bundle — like WordPress, LAMP, or Node.js — pick a plan size, and click launch. Pricing is predictable: a fixed monthly fee. The current entry bundles fall in roughly the **$3.50 to $5 per month** range — Lightsail offers IPv6-only bundles that can start around $3.50/month and public-IPv4 bundles that typically start around $5/month, with the exact figure depending on bundle, region, and current AWS pricing. Verify the bundle you want on the official Lightsail pricing page before you commit. For most small business websites, Lightsail is the right answer. Second, EC2 — Elastic Compute Cloud. EC2 gives you a virtual server you control completely. You choose the operating system, the size, what software runs on it. Small EC2 instances can cost only a few dollars to around $15 per month before storage, data transfer, and optional services, depending on family, size, region, architecture, and usage hours. Large instances with lots of memory and CPU can cost much more. EC2 is the right choice when you need full control or when you're running custom applications. Third, Lambda — AWS's serverless offering. Instead of running a server 24/7, you write a function and Lambda runs it whenever it's triggered — by an HTTP request, a file upload, a scheduled time. You pay only for the milliseconds of execution. The free tier gives you 1 million requests per month, which is more than enough for most small projects. Lambda is perfect for occasional tasks, scheduled jobs, and APIs with low traffic. Fourth, containers — using ECS, EKS, or Fargate. Containers are how larger applications are packaged and deployed. They're more powerful but require more knowledge. Most beginners don't need them. The rule of thumb: start with Lightsail. Move to EC2 when you outgrow Lightsail. Use Lambda for one-off tasks. Reach for containers when your team is already comfortable with Docker.

**Learner Check / Reflection:**
Action prompt: pick a project of your own, choose one of the four compute options for it, and write down two reasons you chose that one over the others.

---

### Slide 9: Storage Explained (S3, EBS)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Storage = somewhere to put files and data.** AWS has two main storage services for hosting.
- **S3 (Simple Storage Service)** — object storage for files: images, videos, backups, downloads, static website content
  - Pricing: **about $0.023 per GB per month** for S3 Standard, first 50 TB/month, in common US-region pricing examples (so 5 GB ≈ $0.12). *Approximate, region- and tier-dependent — verify on the official S3 pricing page.*
  - Free tier: 5 GB free for the first 12 months
  - Can serve files directly to the public internet (perfect for static sites)
- **EBS (Elastic Block Store)** — virtual hard drives that attach to EC2 instances
  - Pricing: **about $0.08 per GB-month for gp3 volumes** in regions with that rate (so a 30 GB gp3 drive ≈ $2.40). Other EBS volume types (gp2, io1, io2, st1, sc1) have different rates. *Approximate, region- and volume-type-dependent — verify on the official EBS pricing page.*
  - Acts exactly like a physical hard drive on a server
  - Snapshots (backups) cost extra but are cheap
- **The mental model:** S3 is for *files you store and retrieve*. EBS is for *the disk on your server*.

**Visual / Diagram Instruction:**
Two boxes side by side. Left: S3 — illustrated as a series of files (image, video, backup file) flowing into an "S3 bucket" container with a globe icon (public access). Right: EBS — illustrated as a hard drive icon connected by a wire to an EC2 server icon. Below each, list the price per GB and a small example total.

**Chart / Data Instruction:**
None — the cost numbers in the slide content are sufficient.

**Speaker Notes:**
Storage is the second of the four building blocks. Every website and application needs to store files somewhere — images, videos, PDFs, backups, downloadable assets, log files. AWS has two main storage services to know about. The first is S3, which stands for Simple Storage Service. S3 is what's called "object storage" — you store individual files (called objects) inside containers (called buckets). S3 is durable, cheap, and can serve files directly to the public internet, which makes it perfect for two things: hosting static websites (HTML, CSS, JS, images), and storing files that your application needs to keep — like user profile photos or product images. Pricing is based on how much you store. As an illustrative example, S3 Standard for the first 50 terabytes per month is around $0.023 per gigabyte in common US-region pricing — so 5 gigabytes of images costs roughly 12 cents per month. The exact rate varies by region and storage tier (S3 Standard, S3 Standard-IA, S3 Glacier, etc.), so verify on the official S3 pricing page before relying on a number. The free tier gives you 5 gigabytes free for your first 12 months. For most small projects, S3 storage costs are basically rounding-error money. The second storage service is EBS, which stands for Elastic Block Store. EBS gives you virtual hard drives that attach to EC2 instances. If you launch an EC2 server, the disk that server runs on is an EBS volume. EBS is more expensive per gigabyte than S3 — for gp3 volumes (the modern general-purpose default), pricing is around $0.08 per gigabyte per month in regions that offer it. Other EBS volume types — gp2, io1, io2, st1, sc1 — are priced differently, so the right number depends on what you choose. EBS is also where you'd store snapshots, which are point-in-time backups of your server's disk. Snapshots cost extra but are very cheap and are how you'd recover from a server failure. The mental model that helps most beginners: S3 is for files you store and retrieve through a website or an API. EBS is the disk attached to a server. They're not interchangeable — you wouldn't use EBS to host public images, and you wouldn't use S3 as your server's hard drive.

**Learner Check / Reflection:**
For a project you have in mind, what files would you store in S3 versus what would live on the server's disk in EBS?

---

### Slide 10: Databases Explained (RDS, DynamoDB, Aurora)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Databases = somewhere to store structured data your app reads and writes constantly** (users, orders, posts, inventory, etc.)
- **RDS (Relational Database Service)** — managed traditional databases (MySQL, PostgreSQL, MariaDB, SQL Server, Oracle). Starts around $15/month for a small instance.
- **Aurora** — AWS's own high-performance version of MySQL and PostgreSQL. Faster and more reliable than standard RDS, but more advanced and not usually the cheapest beginner choice. Realistic starting cost is roughly **$45–$60+/month** depending on Serverless v2 versus provisioned setup, storage, I/O, region, and configuration.
- **DynamoDB** — a NoSQL database. **NoSQL databases are designed for flexible, high-scale data patterns where information does not always fit neatly into spreadsheet-like rows and columns.** Different shape from RDS (no joins, no SQL), but extremely fast and cheap at low usage. Free tier covers 25 GB plus a generous monthly allowance of read and write capacity.
- **For most beginners:** RDS with PostgreSQL or MySQL is the right answer. DynamoDB if your app is built around its NoSQL model. Aurora when you have outgrown standard RDS, need extra performance or reliability, and have the budget to match.

**Visual / Diagram Instruction:**
Three vertical cards side by side. RDS — traditional table icon, "Relational, well-known SQL." Aurora — AWS-branded card, "AWS's faster MySQL/PostgreSQL — more advanced, more expensive." DynamoDB — key-value icon, "NoSQL, very fast at scale." Each card has a starting price range and a "best for" line. Make Aurora visibly the most advanced/expensive of the three.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Almost every web application needs a database. A database is where structured data lives — the kind of data your application is constantly reading from and writing to. User accounts. Blog posts. Orders. Inventory. Shopping carts. Comments. AWS has three main database options to know about. First, RDS — Relational Database Service. RDS is AWS's managed offering for traditional relational databases. You can run MySQL, PostgreSQL, MariaDB, SQL Server, or Oracle on RDS. The word "managed" is the important part — AWS handles the setup, the patching, the backups, and the day-to-day operations. You just point your application at it. Pricing starts around $15 per month for a small instance, suitable for small applications and prototypes. Second, Aurora. Aurora is AWS's own enhanced version of MySQL and PostgreSQL. It's faster, more reliable, and built on AWS-native infrastructure. It is more advanced than standard RDS — and more expensive. Realistic starting costs are roughly $45 to $60 or more per month depending on whether you use Aurora Serverless v2 or a provisioned instance, plus the cost of storage and I/O. For beginners, Aurora is rarely the cheapest first database — it earns its place when you have outgrown standard RDS or need its specific reliability and performance characteristics. Third, DynamoDB. DynamoDB is a different kind of database called NoSQL. Instead of tables, rows, and columns, you store data as key-value pairs or documents. The trade-off: you lose features like joins and complex queries, but you gain extreme speed and very low cost at scale. The free tier covers 25 gigabytes of storage and a generous number of read and write operations per month. DynamoDB is great for applications that need fast, simple lookups — like session storage, user preferences, or large catalogues. For most beginners, the right answer is RDS with PostgreSQL or MySQL. These are the most widely supported databases in the world, with the most tutorials and the largest community. Reach for DynamoDB only if you're building an application designed around its NoSQL model. Reach for Aurora when you need extra performance or reliability and you have the budget.

**Learner Check / Reflection:**
Does your project need a relational database (users, orders, related records) or could it work with a simpler key-value store?

---

### Slide 11: Networking Explained (VPC, Route 53, Load Balancers, CloudFront)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Networking = the wiring between your services and the path to your users.**
- **VPC (Virtual Private Cloud)** — your own private network inside AWS. Creating a VPC itself is free, **but components like NAT Gateway, VPC endpoints, Transit Gateway, and inter-region/internet data transfer can add real charges**. Verify on the official VPC pricing page.
- **Route 53** — AWS's DNS service. Connects domain names (like *yoursite.com*) to your servers. About $0.50/month per hosted zone plus a small per-request fee.
- **Load Balancer (ELB/ALB)** — distributes incoming traffic across multiple servers. About $18/month for a small one. Used when you have more than one server.
- **CloudFront** — AWS's CDN (content delivery network). Caches your website's content at edge locations around the world so users get faster page loads. Free tier covers 1 TB of data transfer per month.

**Visual / Diagram Instruction:**
A horizontal flow diagram showing a user request: User's browser → Route 53 (DNS) → CloudFront (CDN, edge cache) → Load Balancer → multiple EC2 servers inside a VPC → Database. Label each network service in plain language.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Networking is the third building block. It's how your services talk to each other and how your users reach your application. AWS has four main networking services to know about. First, VPC — Virtual Private Cloud. A VPC is your own private network inside AWS. When you launch any AWS resource — an EC2 server, an RDS database, a load balancer — it lives inside a VPC. You define the network rules, the IP address ranges, and what's allowed to talk to what. The good news for beginners: AWS gives every account a default VPC that works out of the box, and creating a VPC itself is free. The caveat: while the VPC is free, several components you might add to it — NAT Gateway, VPC endpoints, Transit Gateway, and data transfer across regions or out to the internet — do cost real money. NAT Gateway alone is around $32 per month plus data transfer, and is a common surprise on beginners' first AWS bills. Don't enable these components until you understand why you need them. Second, Route 53. Route 53 is AWS's DNS service. DNS is what translates domain names like yoursite.com into the IP addresses that browsers actually use to find your server. When you buy a domain name and point it at your AWS-hosted website, Route 53 is doing the translation. Cost is about 50 cents per month per hosted zone, plus a tiny fee per million DNS queries. For one website, your monthly Route 53 bill is essentially 50 cents. Third, load balancers. A load balancer takes incoming traffic and spreads it across multiple servers. You only need a load balancer when you have more than one server — for example, when you're scaling horizontally to handle more users. AWS's Application Load Balancer costs about $18 per month plus per-request fees. For single-server setups, you can skip the load balancer entirely. Fourth, CloudFront — AWS's content delivery network, or CDN. CloudFront caches copies of your website's content at hundreds of edge locations around the world, so a user in Sydney gets the page from a server in Sydney, not from your origin server in Virginia. The result is dramatically faster page loads and lower bandwidth costs. The free tier covers 1 terabyte of data transfer per month — enough for most small business sites — and beyond that, CloudFront is cheaper than serving from S3 or EC2 directly.

**Learner Check / Reflection:**
For a global audience, would you benefit more from a CDN like CloudFront, or is your audience concentrated in one region?

---

### Slide 12: Security Explained (IAM, Security Groups, Encryption, Shared Responsibility)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Security = who can access what, and how.** Four core ideas to know.
- **IAM (Identity and Access Management)** — controls who can log in and what they can do. Free.
- **Security Groups** — virtual firewalls around your servers. Default behaviour: block everything inbound, allow everything outbound. You open the ports you need.
- **Encryption** — protect data at rest (when stored) and in transit (when moving). Several AWS services now provide default or near-default encryption (for example, S3 has had default server-side encryption for new objects since January 2023; EBS supports default encryption per region; RDS supports it at create-time). The cost is essentially zero, but **you are still responsible for confirming the encryption settings actually fit your use case** (which keys, which algorithms, who can access them).
- **Shared Responsibility Model** — beginner shorthand: *"AWS secures the cloud; you secure what you put in it."* The real model is more detailed than that — AWS is responsible for the security *of* the cloud (physical data centers, hardware, the underlying infrastructure), and you are responsible for security *in* the cloud (your data, your IAM policies, your security group rules, your application configuration, your encryption choices). The exact split varies by service. Read the official **AWS Shared Responsibility Model** page on aws.amazon.com before making any architecture decision that depends on this division.

**Visual / Diagram Instruction:**
A two-column "shared responsibility" diagram. Left column: "AWS is responsible for the security OF the cloud" — physical data centers, hardware, network infrastructure. Right column: "You are responsible for the security IN the cloud" — your data, your access policies, your application configuration, your encryption choices. Use a horizontal line splitting the cloud into the two layers.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Security in the cloud is one of those topics that sounds intimidating but is actually built around four fairly simple ideas. The first is IAM — Identity and Access Management. IAM is how you control who can log in to your AWS account and what they're allowed to do. When you sign up for AWS, you get a "root account" that has full access to everything. The most important early security move you'll make is creating IAM users with limited permissions for everyday work, and locking the root account away. IAM is free. The second is security groups. A security group is a virtual firewall that wraps around your servers. By default, security groups block all inbound traffic and allow all outbound traffic. You then open the specific ports you need — for example, port 80 for HTTP and port 443 for HTTPS for a web server. Beginners sometimes open all ports to "make things work" — this is the most common security mistake on AWS. Don't do it. The third is encryption. AWS supports two kinds: encryption at rest (when your data is sitting in S3, RDS, or EBS) and encryption in transit (when data moves between services or to a user's browser). Several AWS services now provide encryption at rest by default — S3 has had default server-side encryption for new objects since January 2023, EBS supports default encryption that you can turn on per region, and RDS supports encryption at the moment you create the database. The cost is essentially zero. But you are still responsible for *confirming the encryption settings fit your use case* — which keys are used, who can access those keys, and whether the algorithm meets any compliance requirements you have. The fourth is the Shared Responsibility Model. The beginner shorthand is "AWS secures the cloud; you secure what you put in it." The real model is more detailed than that. AWS is responsible for security *of* the cloud — physical security of data centers, the hardware, the network infrastructure that connects everything. You are responsible for security *in* the cloud — your data, your IAM policies, your security group rules, your application configuration, whether you've enabled encryption, whether you've enabled backups. The exact division between AWS and you varies by service, so before any architecture decision that hinges on it, look up the official AWS Shared Responsibility Model page directly on the AWS website. Mistakes about this division are how data breaches happen. AWS will not back up your database if you don't enable backups. AWS will not stop you from making your S3 bucket public. The tools are there; the responsibility is yours.

**Learner Check / Reflection:**
Action prompt: pick one project you might launch on AWS. List three things you would be responsible for under the Shared Responsibility Model, and one thing AWS would handle for you.

---

### Slide 13: Availability Explained (Regions, AZs, Uptime, Backups)

**Estimated Time:** 2 minutes

**Slide Content:**
- **Availability = the percentage of time your service is actually working and reachable.**
- **Regions** — geographic areas where AWS has data centers. Examples: us-east-1 (N. Virginia), eu-west-1 (Ireland), ap-southeast-2 (Sydney). 30+ regions globally.
- **Availability Zones (AZs)** — separate data centers within a region, with independent power and networking. Each region has 2–6 AZs.
- **Uptime tiers:** 99% = 3.6 days of downtime per year. 99.9% = 8.7 hours/year. 99.99% = 52 minutes/year. 99.999% = 5 minutes/year.
- **Backups** — automated snapshots of your databases (RDS) and disks (EBS). Cheap and essential. The single most important checkbox you'll tick in your first month. **Note:** RDS automated backup retention defaults to a short window (review and often increase beyond the default — many teams use 7 days or longer). For broader, multi-service backup planning across RDS, EBS, EFS, DynamoDB and more, look at **AWS Backup** as a dedicated service.

**Visual / Diagram Instruction:**
A globe-style map highlighting 5–6 representative AWS regions. Then below the map, a single region zoomed in to show 3 AZs as separate buildings, each labelled with its independent power, cooling, and networking. To the right, a small uptime ladder showing the four uptime tiers and their downtime equivalents.

**Chart / Data Instruction:**
Optional bar chart of "Annual downtime by uptime tier" (99% = 87.6 h, 99.9% = 8.76 h, 99.99% = 52.6 min, 99.999% = 5.26 min) to make the numbers visceral.

**Speaker Notes:**
Availability is the number that tells you how reliable your hosted service is. It's expressed as a percentage of "uptime" — how much of the year your service is actually working. Most cloud services target one of four standard uptime tiers, and the differences matter. 99 percent uptime sounds great until you do the math — that's 3.6 days of downtime per year, which is unacceptable for most businesses. 99.9 percent — sometimes called "three nines" — is 8.7 hours of downtime per year, which is what most basic hosting promises. 99.99 percent — "four nines" — is 52 minutes per year, the standard for serious business applications. 99.999 percent — "five nines" — is just over 5 minutes per year, the standard for critical infrastructure like banking. AWS achieves these uptime targets through two layers of physical redundancy. The first layer is regions. A region is a geographic area where AWS operates. Examples include us-east-1 in North Virginia, eu-west-1 in Ireland, ap-southeast-2 in Sydney. There are more than 30 regions globally as of 2024. When you launch an AWS resource, you pick a region — usually the one closest to your users for the lowest latency. The second layer is Availability Zones — usually called AZs. An AZ is a separate physical data center within a region, with its own power, cooling, and networking. Each region has between two and six AZs. The point of multiple AZs is that if one data center has a problem — a power outage, a fire, a fibre cut — the others keep running. Architectures designed for high availability deploy across multiple AZs so that a single data center failure doesn't take the whole service down. Beyond redundancy, the other side of availability is backups. RDS supports automated daily backups; EBS supports point-in-time snapshots. Both are cheap and both should be turned on from day one. Two beginner gotchas to know about: first, the RDS default backup retention is short — review it and often increase it (many teams keep 7 days or longer). Second, if you have backup needs across multiple AWS services — say, RDS plus EBS plus DynamoDB plus EFS — there's a dedicated service called AWS Backup that lets you manage all of those in one place with consistent retention rules. The single most common preventable disaster on AWS is data loss because someone didn't enable backups. Don't be that someone.

**Learner Check / Reflection:**
Action prompt: pick a project. Choose an uptime tier (99%, 99.9%, or 99.99%) and write down two specific consequences if your service hit *only* that tier — i.e. how much downtime per year, and what that would mean for your users or your business.

---

### Slide 14: Scalability Explained (Vertical vs Horizontal, Auto Scaling)

**Estimated Time:** 2 minutes

**Slide Content:**
- **Scalability = the ability to handle more (or less) load by adjusting resources.**
- **Vertical scaling (scale up)** — make the existing server bigger (more CPU, more memory). Simple, but limited by the maximum instance size and requires a brief restart.
- **Horizontal scaling (scale out)** — add more servers behind a load balancer. Unlimited growth potential. Preferred for cloud applications.
- **Auto Scaling** — AWS automatically adds or removes servers based on demand. You set rules ("if CPU > 70% for 5 minutes, add a server"; "if CPU < 30% for 15 minutes, remove a server").
- **Why this matters:** during a traffic spike, a properly-configured auto-scaling group keeps your site fast without manual intervention. When the spike ends, capacity drops automatically — and so does the bill.

**Visual / Diagram Instruction:**
Two visual comparisons side by side. Left: vertical scaling — a single server icon getting visibly larger. Right: horizontal scaling — one server becoming many smaller server icons behind a load balancer. Below, a third diagram showing an auto scaling group with a graph of traffic spiking and the number of servers automatically rising and falling in response.

**Chart / Data Instruction:**
Optional line chart showing "Traffic over a typical day" (a daytime peak) overlaid with "Number of servers" (auto scaling rising and falling in step) — to make the value of auto scaling visceral.

**Speaker Notes:**
Scalability is the ability of your hosted service to handle more or less load by adjusting resources. There are two fundamental ways to scale, and understanding the difference is core to thinking about cloud architecture. The first is vertical scaling, sometimes called "scaling up." This means making your existing server bigger — more CPU, more memory, faster disk. On AWS, this is as simple as stopping your EC2 instance, changing its instance type to a bigger one, and starting it again. Vertical scaling is straightforward but it has two limits. First, there's a maximum instance size — eventually you can't go bigger. Second, you have a brief downtime during the resize. Vertical scaling works well for databases and small applications where you can predict your maximum need. The second is horizontal scaling, sometimes called "scaling out." This means adding more servers, each one handling part of the traffic, with a load balancer in front distributing requests across them. Horizontal scaling has essentially unlimited growth potential — you can add hundreds of servers if you need to. It's the preferred approach for modern cloud applications, especially anything user-facing. The trade-off is that your application has to be designed to run across multiple servers, which is harder than running on one. The third concept is auto scaling. Auto scaling is what makes horizontal scaling practical. You define a group of servers and a set of rules — for example, "if average CPU usage goes above 70 percent for 5 minutes, add another server"; "if it drops below 30 percent for 15 minutes, remove one." AWS handles the rest automatically. The result is that your service handles traffic spikes gracefully without you having to wake up at 3 AM to add servers, and your bill drops automatically when the spike is over. This is one of the genuine superpowers of cloud hosting that's almost impossible to replicate with traditional infrastructure. For your first AWS project, you probably don't need auto scaling — a single instance is fine. Add it when you have actual evidence of variable traffic.

**Learner Check / Reflection:**
For a project you're working on, would you expect traffic to be steady, or to have big spikes (e.g. around a campaign, a release, or a busy season)?

---

### Slide 15: Cost Explained (Pay-as-you-go, Free Tier, Budgets)

**Estimated Time:** 2 minutes

**Slide Content:**
- **AWS billing in three sentences:**
  - You pay only for what you actually use, billed by the hour, by the GB, or by the request.
  - There's no upfront commitment and no minimum monthly fee.
  - You can stop using any service and the bill drops the next billing cycle.
- **AWS Free Tier (12 months for new accounts):**
  - 750 hours/month of t2.micro or t3.micro EC2 (basically a free small server)
  - 5 GB of S3 storage
  - 750 hours/month of small RDS database
  - 1 million Lambda requests per month (forever, not just 12 months)
- **AWS Budgets** — set a monthly spending limit and get email alerts. **AWS Budgets includes a limited number of free budgets per account; additional budgets may have a small daily charge. Always verify current terms.** Set up at least one before you do anything else.
- **AWS Cost Explorer** — a free dashboard that visualises where your money is going across services and over time. Turn it on from day one.
- **AWS Cost Anomaly Detection** — a free service that uses machine learning to flag unusual spending patterns and email you when something looks wrong. Cheap insurance against runaway bills.

**Visual / Diagram Instruction:**
A clean three-panel layout. Panel 1: "Pay-as-you-go" — visualised as a meter or counter ticking up by the hour. Panel 2: "Free Tier" — the four free tier highlights as bullet points with check icons. Panel 3: "Budget alerts" — an example notification email or banner saying "You've spent $25 of your $50 monthly budget."

**Chart / Data Instruction:**
None.

**Speaker Notes:**
AWS pricing scares a lot of beginners because the AWS console makes it look complicated. It's not — at least not at the level we care about for this course. AWS billing comes down to three sentences. First, you pay only for what you actually use. Compute is billed by the hour. Storage is billed by the gigabyte per month. Data transfer is billed by the gigabyte. Lambda is billed by the millisecond. There's no flat monthly fee. Second, there's no upfront commitment. You don't sign a contract. You don't pay for capacity you're not using. Third, you can stop using any service and the bill drops the next billing cycle. Want to delete an EC2 instance? Terminate it and you stop paying for it immediately. The most important thing for a new account is the Free Tier. AWS's Free Tier gives every new account 12 months of free access to most of the services we've talked about. The headline benefits: 750 hours per month of a small EC2 instance, which is essentially a free server running 24/7; 5 gigabytes of S3 storage; 750 hours per month of a small RDS database. Some Free Tier offerings — like 1 million Lambda requests per month — are forever, not just 12 months. The Free Tier is genuinely useful for learning and for hosting small personal projects. Use it. The other thing every new AWS user must do, on day one, is set up an AWS Budget with email alerts. AWS Budgets includes a limited number of free budgets per account — additional budgets may carry a small daily charge, so verify current terms — but most beginners stay well inside the free quota. You tell it "alert me if I spend more than $25 in a month" and it emails you when you cross 50 percent, 80 percent, and 100 percent of that threshold. The horror stories you hear about $5,000 surprise AWS bills almost always come from people who didn't set up budget alerts. Two minutes of setup will save you from every one of those stories. While you're in the cost console, also turn on two adjacent services that are free and quietly very useful. **AWS Cost Explorer** gives you a visual dashboard of where your spending is going across services and over time — it makes patterns visible that the raw bill hides. **AWS Cost Anomaly Detection** uses machine learning to spot unusual spend patterns and email you proactively when something looks wrong. Together, the three services — Budgets, Cost Explorer, Anomaly Detection — give you guardrails, visibility, and early warning. Switch on all three on day one.

**Learner Check / Reflection:**
What monthly spending cap would feel "safe" for you while you're learning AWS — $10, $25, $50?

---

### Slide 16: Static Website Example ($2–$6/month)

**Estimated Time:** 2 minutes

**Slide Content:**
- **Use case:** a portfolio site, a small marketing page, documentation, a brochure site. HTML, CSS, JavaScript, and images only — no database, no backend.
- **Architecture:** S3 + CloudFront + Route 53 (+ ACM for free HTTPS).
- **Cost breakdown (monthly):**
  - S3 storage: ~$0.10 (5 GB)
  - CloudFront data transfer: ~$0–$3 (free tier covers 1 TB)
  - Route 53 hosted zone: ~$0.50
  - ACM certificate: free
  - **Total: $2–$6/month** for a typical small site
- **Best for:** anyone who needs a fast, cheap, reliable website without a backend.
- *Pricing illustrative — see the pricing disclaimer at the top of this document and verify current rates on the official AWS pricing pages before relying on these figures.*

**Visual / Diagram Instruction:**
A clean architecture diagram, left to right: User → Route 53 (DNS) → CloudFront (CDN) → S3 (origin). Each box labelled with its monthly cost. Highlight that the entire stack is "serverless" — no servers to maintain.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Now we're going to walk through four real-world hosting examples, from the simplest to the most complex, with actual cost estimates. The first example is a static website. A static website is one where every page is a fixed HTML file — no backend, no database, no user logins, no dynamic content. Examples include a portfolio site, a small business marketing page, technical documentation, or a brochure site. For static sites, the right architecture on AWS is S3 plus CloudFront plus Route 53. S3 stores your HTML, CSS, JS, and image files. CloudFront caches them at edge locations around the world for fast delivery. Route 53 connects your domain name to CloudFront. And ACM — AWS Certificate Manager — gives you a free HTTPS certificate so your site loads with a padlock. Let's add up the cost. S3 storage for a typical small site (around 5 gigabytes including images) is about 10 cents per month. CloudFront data transfer depends on traffic, but for most small sites the free tier covers it — call it $0 to $3 per month. Route 53 is 50 cents per month per hosted zone. ACM is free. Total: $2 to $6 per month for a complete, fast, secure static site that can handle bursts of traffic without breaking a sweat. The reason this architecture is so popular is that it has no servers to maintain, no operating system to patch, no software to update. You just upload your files and they're served to the world. For anyone whose project doesn't need a database or a backend, this is the answer.

**Learner Check / Reflection:**
Could a static site work for your project, or do you need something dynamic like user logins or a database?

---

### Slide 17: Small Business Website Example ($7–$15/month)

**Estimated Time:** 2 minutes

**Slide Content:**
- **Use case:** WordPress site, small blog, small business website with contact forms and image galleries. Some dynamic content but moderate traffic.
- **Architecture:** Lightsail (WordPress) + S3 (image storage) + Route 53 + SES (transactional email).
- **Cost breakdown (monthly, approximate, region- and bundle-dependent):**
  - Lightsail WordPress instance: roughly $3.50–$5 to start (varies by IPv6/public-IPv4 bundle, region, and current AWS pricing). The familiar $5/month bundle includes 1 GB RAM, 40 GB SSD, 2 TB transfer.
  - S3 storage: ~$1 (extra image storage and backups)
  - Route 53 hosted zone: ~$0.50
  - SES email: ~$0.01 (about $0.10 per 1,000 outbound emails — so 100 emails ≈ $0.01, excluding edge cases and region/configuration differences)
  - **Total: very roughly $5–$7/month** for an entry-level setup — comfortably inside a $7–$15 budget for any reasonable variation
- **Best for:** a small business that needs a real website with content management, contact forms, and a custom domain.
- *Pricing illustrative, region- and usage-dependent. Verify current rates on the official AWS pricing pages before purchase or deployment.*

**Visual / Diagram Instruction:**
Architecture diagram: User → Route 53 → Lightsail (WordPress) → S3 (for media). SES off to the side handling outbound email. Use the Lightsail logo or a clear "WordPress" badge to make it concrete. Add the cost next to each box.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
The second example is a small business website with some dynamic content. Think of a coffee shop website with a menu, contact form, blog, and image gallery — moderate traffic, maybe a few hundred visitors a day. For this kind of site, the right answer is Lightsail. Lightsail is AWS's simplified hosting service, and it offers pre-configured WordPress instances starting roughly in the $3.50 to $5 per month range, depending on whether you choose an IPv6-only or public-IPv4 bundle, the region, and current AWS pricing. The familiar $5/month bundle gives you a small server with 1 GB of memory, a 40 GB SSD, and 2 terabytes of monthly data transfer — more than enough for a small business site. Next to that, you'd typically want some S3 storage for extra image storage and for backups — about $1 per month for a few gigabytes. Route 53 connects your custom domain — about 50 cents per month. And SES, AWS's Simple Email Service, handles outbound transactional email for the contact form. SES costs roughly $0.10 per 1,000 outbound emails, so the volume a small site generates — say a hundred emails per month — comes out to roughly a single cent. Add it all up and the total comes to very roughly $5 to $7 per month for an entry-level setup. That's a real, professional small business website with a custom domain, content management, contact forms, and a real backend. The reason Lightsail is so good for this use case is that it bundles together everything WordPress needs — a server, a web server, PHP, MySQL, a backup tool — into a single managed package. You don't have to know how to configure any of those things. You just install WordPress through the Lightsail console and start adding content. For comparison, shared hosting can be very cheap for simple websites, sometimes only a few dollars per month on promotional plans, but it gives you less control and less flexibility than a custom AWS architecture and tends to scale poorly when your site grows. Lightsail sits between basic shared hosting and full EC2 — more capable than shared hosting, far simpler to operate than EC2. As always, verify current pricing on the official Lightsail page before you choose a bundle.

**Learner Check / Reflection:**
For a small business site, do you have a strong preference for WordPress, or would you build it with something else?

---

### Slide 18: Web Application with Database Example ($55–$100/month)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Use case:** a SaaS web app, a custom internal tool, a member portal, a booking system. User logins, real database, custom application code.
- **Architecture:** EC2 (application server) + RDS (database) + S3 (file storage) + Route 53 + Application Load Balancer (optional).
- **Cost breakdown (monthly, approximate, region- and usage-dependent):**
  - EC2 t3.small (application server): ~$15 (varies by region, architecture, and usage hours)
  - RDS db.t3.small PostgreSQL with backups: ~$30 (compute + 20 GB storage + automated backup storage)
  - S3 storage (50 GB): ~$1.20
  - Route 53: ~$0.50
  - Application Load Balancer (if scaling): ~$18 (base + per-LCU charges)
  - Data transfer and incidentals: ~$5
  - **Total: roughly $55–$100/month** depending on whether you include the load balancer and how much traffic you have
- **Best for:** a real web application with users and data, low to moderate scale.
- *Pricing illustrative, region- and usage-dependent. Verify current rates on the official AWS pricing pages before deployment.*

**Visual / Diagram Instruction:**
Architecture diagram: User → Route 53 → optional Application Load Balancer → EC2 application server → RDS database. S3 off to the side for file uploads. Each box labelled with its cost. Highlight that this is a "real app" architecture vs. the simpler ones on the previous slides.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
The third example is a real web application with a database. This is the architecture for a SaaS product, a custom internal tool, a member portal, a booking system, or any application where users log in, your code runs custom logic, and data lives in a database. The architecture has more pieces than the previous examples. You need EC2 to run your application code. You need RDS for your database. You need S3 for any user-uploaded files like profile pictures or attached documents. You need Route 53 for your domain. And once you have more than one EC2 instance — or once you want zero-downtime deployments — you add an Application Load Balancer in front. Let's add up the cost. A small EC2 instance, the t3.small, costs about $15 per month and is enough for a small to medium application. An RDS PostgreSQL database on db.t3.small with automated backups costs about $30 per month. S3 storage for 50 gigabytes of user uploads costs about $1.20. Route 53 is 50 cents. An Application Load Balancer is about $18, but you can skip this for the first few months and add it when you scale to multiple servers. Add a few dollars for data transfer and small extras, and you're at $55 to $100 per month total. Compared to traditional hosting, this might sound expensive — you can rent a dedicated server for $50 per month elsewhere. But you're getting things on AWS that traditional hosting doesn't include: automated database backups, a separate database server (so a server crash doesn't lose your data), the ability to scale instantly, and integration with all the other AWS services you might need later. For a serious web application, this is excellent value.

**Learner Check / Reflection:**
Action prompt: look at the architecture on this slide and identify one risk in it. (Hints: what happens if the EC2 instance fails? What happens if the RDS instance fails? Where does the data live if a hard drive dies?) Write down the risk and one concrete change that would mitigate it.

---

### Slide 19: E-commerce/Marketplace Example ($140–$320/month)

**Estimated Time:** 2.5 minutes

**Slide Content:**
- **Use case:** an online store, a marketplace, an app with payments and high availability requirements. Real customers, real money, real consequences if it goes down.
- **Architecture:** EC2 with Auto Scaling + RDS Multi-AZ + S3 + CloudFront (CDN) + Route 53 + Application Load Balancer + ElastiCache (optional, for performance).
- **Cost breakdown (monthly, approximate, region- and usage-dependent):**
  - EC2 Auto Scaling group (2–4 instances): roughly $60–$150 (varies by family, size, region, hours)
  - RDS Multi-AZ PostgreSQL: ~$80 (Multi-AZ runs a synchronously-replicated standby and is roughly double the single-AZ cost)
  - Application Load Balancer: ~$22 (base + per-LCU charges)
  - S3 storage (200 GB product images): ~$5
  - CloudFront data transfer: ~$10–$30 depending on traffic
  - Route 53: ~$0.50
  - ElastiCache (Redis, optional): ~$15
  - **Total: roughly $140–$320/month** depending on traffic, redundancy, and add-ons
- **Best for:** a serious online business that can't afford to be down.
- *Pricing illustrative, region- and usage-dependent. Verify current rates on the official AWS pricing pages before deployment.*

**Visual / Diagram Instruction:**
A more elaborate architecture diagram showing the full stack: User → Route 53 → CloudFront → ALB → Auto Scaling group of EC2 instances across two AZs → RDS Multi-AZ database → S3. ElastiCache shown alongside the EC2 group. Use a horizontal AZ divider to make the multi-AZ redundancy visible.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
The fourth example is an e-commerce or marketplace application. This is the full-fat architecture for a real online business — an online store, a marketplace, a SaaS app processing payments. The defining requirement at this scale is that downtime costs real money, so the architecture is built around redundancy and performance. You have an Auto Scaling group of EC2 instances — typically 2 to 4 — spread across multiple availability zones, so a data center failure doesn't take down the site. In front of them is an Application Load Balancer distributing traffic. The database is RDS in Multi-AZ mode, which means there's a synchronously-replicated standby in a different availability zone — if the primary fails, AWS automatically fails over to the standby with minimal interruption. CloudFront serves your product images and static assets globally for fast page loads everywhere. ElastiCache, AWS's managed Redis service, sits alongside your application servers to cache frequently-accessed data and speed up your database. Let's add up the costs. The Auto Scaling group of 2 to 4 EC2 instances runs $60 to $150 per month depending on the size and number. RDS Multi-AZ doubles the database cost compared to single-AZ — about $80 per month for our example PostgreSQL instance. The Application Load Balancer is $22. S3 for 200 gigabytes of product imagery is about $5. CloudFront for moderate traffic is $10 to $30. Route 53 is 50 cents. And ElastiCache adds about $15 if you use it. Total: $140 to $320 per month depending on your traffic and your choices. This is a real serious-business architecture. It can handle thousands of concurrent users, survives single-server and single-data-center failures, and scales automatically with demand. If you compare it to running an equivalent e-commerce stack on traditional infrastructure — physical servers, redundant database hardware, manual failover, your own CDN contract — you're looking at thousands of dollars per month of fixed costs and a full-time IT person. AWS at $140 to $320 per month is exceptional value for what you get.

**Learner Check / Reflection:**
For an e-commerce site, which feels more important: keeping monthly cost under $50, or having multi-AZ redundancy so the site survives a data center failure?

---

### Slide 20: Complete Hosting Architecture Diagram

**Estimated Time:** 2 minutes

**Slide Content:**
- **The full picture: how all the AWS pieces fit together for a serious web application.**
- **User flow (left to right):**
  - User's browser →
  - Route 53 (DNS) →
  - CloudFront (CDN, edge caching) →
  - Application Load Balancer →
  - EC2 Auto Scaling group (across multiple AZs) →
  - RDS Multi-AZ database
- **Supporting services running quietly in the background:**
  - S3 for file storage and backups
  - IAM for access control
  - CloudWatch for monitoring and alerts
  - SES for email
  - AWS Backup for automated snapshots

**Visual / Diagram Instruction:**
This is the most important diagram in the deck. A full-page horizontal architecture diagram. Use four layered "lanes" from left to right: user/edge layer, network/security layer, application layer, data layer. Place each AWS service in its lane. Use clear arrows to show the request flow. Use a horizontal divider to indicate the two AZs containing the EC2 instances and the RDS primary/standby. Below the main diagram, show the supporting services as a horizontal strip labelled "background services."

**Chart / Data Instruction:**
None.

**Speaker Notes:**
This slide pulls everything we've covered into one diagram. Take a moment to look at it. This is what a full, production-grade web application architecture looks like on AWS. Let's trace a single user request through it. A user types your domain into their browser. Their browser asks a DNS server "where is yoursite.com?" — Route 53 answers with the address of the CloudFront edge location closest to them. Their browser sends the page request to CloudFront. If CloudFront has a cached copy of the page or the static assets, it returns them immediately — that's the fast path. If not, CloudFront forwards the request to the Application Load Balancer in your origin region. The Load Balancer picks one of the available EC2 servers in your Auto Scaling group, in whichever availability zone has capacity, and forwards the request there. The EC2 server runs your application code. If your code needs to read or write data, it talks to the RDS database — also spread across two availability zones, with automatic failover if the primary goes down. The application generates a response and sends it back through the same path. All of that happens in tens of milliseconds. Around the main request path, you have services running quietly in the background. S3 stores any user-uploaded files and your backups. IAM controls who's allowed to access what. CloudWatch is constantly recording metrics and sending you alerts if anything is wrong. SES handles outbound email. AWS Backup automates point-in-time snapshots of your databases and disks. This whole architecture, end to end, is what you can build on AWS for $140 to $320 per month. Fifteen to twenty years ago, building something with this level of redundancy yourself — multiple servers across multiple data centers, automatic failover, a managed CDN — required substantial up-front investment in physical hardware and operations staff, often costing many times more per month than the AWS equivalent and taking months to set up. That's the magnitude of the shift cloud has caused.

**Learner Check / Reflection:**
Action prompt: pick a project of your own and sketch a simple hosting architecture for it on a piece of paper. Use this slide as a template — start with the user, draw the path through DNS, the network, the application, and the data layer. You don't need to use every box. The goal is one simple, drawable architecture you could explain to a colleague.

---

### Slide 21: Cost Comparison Chart (Traditional vs AWS)

**Estimated Time:** 2 minutes

**Slide Content:**
- **Illustrative side-by-side monthly cost for one specific small business web application** (a database-backed site, a custom domain, backups, SSL, and a CDN). **These numbers are illustrative, not universal — your real comparison depends on your specific workload, your provider choices, and your team.**
- **Traditional (dedicated server + database server + backup service + paid CDN + paid SSL):**
  - Dedicated server: ~$200/month
  - Separate database server: ~$200/month
  - Backup service: ~$50/month
  - SSL certificate: ~$10/month
  - CDN service: ~$50/month
  - **Illustrative total: ~$510/month** (plus IT staff time)
- **AWS (EC2 + RDS + S3 + CloudFront + Route 53), approximate and region-dependent:**
  - EC2 t3.small: ~$15 (varies by region, architecture, and usage hours)
  - RDS db.t3.small with backups: ~$30 (compute + 20 GB storage + backup storage)
  - S3 storage: ~$1
  - CloudFront: ~$5
  - Route 53: ~$0.50
  - **Illustrative total: ~$52/month** (verify current rates before deployment)
- **The honest takeaway:** AWS can be **dramatically cheaper than buying and operating equivalent dedicated infrastructure** for many small-to-medium workloads — but it is **not always the cheapest option**. Very small websites can be cheaper on shared hosting (single dollars per month). Very predictable, large workloads can be cheaper on reserved, dedicated, or colocated infrastructure. The right comparison depends on your specific workload, not on a headline percentage.

**Visual / Diagram Instruction:**
A horizontal bar chart comparing the two illustrative totals — a long traditional bar at $510 and a short AWS bar at $52. **Caption every visual with "Illustrative — based on one specific workload."** Below, the line items for each side as a small two-column table. Avoid headline "X% cheaper" callouts; instead, use a neutral caption such as *"Often dramatically cheaper for small-to-medium workloads — verify with your own numbers."*

**Chart / Data Instruction:**
Bar chart as described above. *Add a clear "Illustrative" tag to the chart title.* Could also include a multi-bar chart showing cost across the four use cases (static site, small business, web app, e-commerce) with traditional vs AWS for each, if space allows — same illustrative caption applies.

**Speaker Notes:**
This slide is where the cost case for AWS lives, and it deserves an honest framing. We've talked about all the AWS services you need to know. Now let's compare what an equivalent setup would cost with traditional hosting versus on AWS, side by side — for one specific kind of workload. Take a small business web application: a few users, a database, a custom domain, backups, SSL, a CDN. On traditional dedicated infrastructure, you'd typically rent a dedicated server for around $200 per month, a separate database server for another $200, a backup service for $50, an SSL certificate for $10, and a CDN contract for $50. Total: about $510 per month, before you add the cost of an IT person. The same workload on AWS: a small EC2 instance for $15, a small RDS database with backups for $30, S3 storage for $1, CloudFront for $5, and Route 53 for 50 cents. Total: about $52 per month. That's a large difference — and for many small-to-medium workloads, AWS is genuinely dramatically cheaper than buying and operating equivalent dedicated infrastructure. But I want to be honest with you about three exceptions, because anyone who looks closely will find them. First, very small websites are often cheaper on shared hosting — single dollars per month for a brochure site. Second, very predictable, very large workloads — think a big database that's always full, always running — can be cheaper on reserved, dedicated, or colocated infrastructure than on AWS list pricing. Third, the comparison above is one specific workload; your numbers will be different. The right way to use this slide is not to remember a percentage, but to remember the *shape* of the comparison: AWS shines for variable, growing, modern workloads; traditional shines for very small or very predictable ones. Run your own numbers before you make a hosting decision.

**Learner Check / Reflection:**
Action prompt: pick a workload of your own. Estimate its monthly traffic, storage, and database size. Then walk through this slide and write down a rough monthly cost on AWS — and compare it honestly to whatever you're paying (or would pay) elsewhere. Note one factor that would push the AWS number up, and one that would push it down.

---

### Slide 22: Cloud Hosting Decision Checklist

**Estimated Time:** 2 minutes

**Slide Content:**
- **Use this checklist when evaluating any new project. Five questions, five minutes.**
- **1. What kind of site is this?** *(Cost ranges below are approximate, region- and usage-dependent — verify before deployment.)*
  - Static site (HTML/CSS/JS only) → S3 + CloudFront (roughly $2–$6/mo)
  - Small business / WordPress → Lightsail (roughly $5–$15/mo all in, with entry Lightsail bundles starting around $3.50–$5/mo depending on bundle and region)
  - Web application with database → EC2 + RDS (roughly $55–$100/mo)
  - High-availability e-commerce → EC2 Auto Scaling + RDS Multi-AZ (roughly $140–$320/mo)
- **2. Where are your users?**
  - One region → standard region, no CDN needed
  - Global → add CloudFront from day one
- **3. How critical is uptime?**
  - Personal/hobby → single AZ is fine
  - Business → multi-AZ for the database
  - Mission-critical → multi-AZ everywhere + Auto Scaling
- **4. What's your budget cap?**
  - Set an AWS Budget alert before you launch anything
- **5. Who will manage it?**
  - Solo non-technical → use Lightsail or static-site approach
  - Have a developer → EC2/RDS gives more flexibility

**Visual / Diagram Instruction:**
A vertical decision-tree-style checklist. Each of the five questions in its own card, with the answers as branching options. Highlight the "recommended path" for a typical small-business beginner all the way down the checklist.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
We've covered a lot of ground. Before moving to mistakes and best practices, let's give you a simple decision checklist you can use any time you start a new project. Five questions, five minutes. All cost ranges below are approximate, region- and usage-dependent — verify current rates on the official AWS pricing pages before deployment. First — what kind of site is this? If it's a static site (just HTML, CSS, and JavaScript), the answer is S3 plus CloudFront for roughly $2 to $6 per month. If it's a small business site or a WordPress site, the answer is Lightsail (entry bundles roughly $3.50 to $5 per month, with all-in costs typically $5 to $15 per month including domain and supporting services). If it's a web application with a database and user logins, the answer is EC2 plus RDS for roughly $55 to $100. If it's a serious e-commerce or high-availability application, the answer is EC2 Auto Scaling plus RDS Multi-AZ for roughly $140 to $320. Second — where are your users? If they're concentrated in one region, pick the AWS region closest to them and skip CloudFront. If they're global, add CloudFront from day one. Third — how critical is uptime? For a personal or hobby project, a single availability zone is fine. For a business application, put your database in Multi-AZ mode. For mission-critical infrastructure, run everything across multiple AZs with auto scaling. Fourth — what's your budget cap? Decide what monthly spending limit feels safe — $25, $50, $100 — and set up an AWS Budget alert before you launch anything. Fifth — who will manage it? If you're a solo non-technical owner, lean toward Lightsail or the static-site approach. If you have a developer or technical co-founder, EC2 and RDS give you more flexibility but more responsibility. Walk through these five questions for any new project and you'll have a defensible architecture in five minutes.

**Learner Check / Reflection:**
Walk through the five questions for a project you're planning. Which architecture does the checklist point you toward?

---

### Slide 23: Common Beginner Mistakes

**Estimated Time:** 3 minutes

**Slide Content:**
- **Avoid These 7 Common Mistakes:**
- **1. Using the root account for daily tasks**
  - Risk: full access to everything; if compromised, attackers can delete everything and run up huge bills
  - Solution: create IAM users with limited permissions and lock the root account away
- **2. Leaving resources running when not needed**
  - Risk: paying for EC2 instances and other resources that aren't being used
  - Solution: stop or terminate unused instances; delete old snapshots and unattached volumes
- **3. Not enabling backups**
  - Risk: losing all your data when something fails or someone deletes the wrong thing
  - Solution: enable automated RDS backups and S3 versioning from day one
- **4. Ignoring security groups**
  - Risk: opening all ports and exposing servers to attacks
  - Solution: only allow the specific ports you need (typically 80 and 443 for web servers)
- **5. Not setting up billing alerts**
  - Risk: surprise bills when traffic spikes or a misconfigured service runs up costs
  - Solution: Set up AWS Budgets with spending alerts
- **6. Choosing the wrong region**
  - Risk: Slow performance for users
  - Solution: Choose region closest to your target audience
- **7. Over-engineering from the start**
  - Risk: Unnecessary complexity and costs
  - Solution: Start simple, scale as needed

**Visual / Diagram Instruction:**
Create a visual showing each mistake as a red X with the solution as a green checkmark. Use icons to represent each mistake (key for root account, dollar sign for costs, shield for security, etc.).

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Let's review common mistakes beginners make with AWS, so you can avoid them. First, using the root account for daily tasks. Your root account has full access to everything — it's like giving someone the master key to your entire building. If compromised, attackers can delete everything and rack up huge bills. Always create IAM users with limited permissions for daily work. Second, leaving resources running when not needed. EC2 instances charge by the hour, even if you're not using them. If you spin up a test server and forget about it, you'll pay for it all month. Stop or terminate unused instances, and delete old snapshots you no longer need. Third, not enabling backups. Databases can fail, files can be accidentally deleted. Without backups, you lose everything. Enable automated RDS backups and use S3 versioning for important files. Fourth, ignoring security groups. By default, security groups block all traffic, which is good. But beginners sometimes open all ports to "make things work," exposing servers to attacks. Only allow necessary traffic — typically just HTTP (port 80) and HTTPS (port 443) for web servers. Fifth, not setting up billing alerts. AWS costs can surprise you if you're not monitoring. Set up AWS Budgets with alerts — for example, notify me if spending exceeds $50 per month. This prevents unexpected bills. Sixth, choosing the wrong region. If your users are in Europe but you choose a US region, your site will be slow. Choose the region closest to your target audience. Seventh, over-engineering from the start. Beginners sometimes build complex architectures with load balancers, auto-scaling, and caching before they have any users. Start simple — a single server is fine initially. Scale as you grow and actually need more capacity.

**Learner Check / Reflection:**
Which of these mistakes do you think is most critical to avoid?

---

### Slide 24: Best Practices for Beginners

**Estimated Time:** 2 minutes

**Slide Content:**
- **Follow These Best Practices:**
- **1. Start with the Free Tier**
  - Experiment without spending money for 12 months
  - Learn by doing with real AWS services
- **2. Use managed services when possible**
  - Lightsail for simple sites, RDS for databases
  - Less management, more time for your business
- **3. Enable encryption for sensitive data**
  - S3, RDS, and EBS all support encryption
  - Protect customer data and comply with regulations
- **4. Tag your resources**
  - Label resources by project, environment, or cost center
  - Makes tracking and billing easier
- **5. Monitor with CloudWatch**
  - Set up alerts for high CPU, disk space, or errors
  - Catch problems before users notice
- **6. Document your architecture**
  - Keep notes on what each resource does
  - Makes troubleshooting and handoffs easier
- **7. Learn incrementally**
  - Master one service before adding another
  - Build confidence through small wins

**Visual / Diagram Instruction:**
Create a visual checklist with each best practice as a numbered item with an icon. Use a clean, professional layout with checkboxes.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Now let's cover best practices that will set you up for success with AWS. First, start with the Free Tier. AWS offers 12 months of free access to many services for new accounts. This is perfect for learning — you can experiment with EC2, RDS, S3, and more without spending money. Use this time to build test projects and gain confidence. Second, use managed services when possible. Lightsail is easier than EC2 for simple sites. RDS is easier than managing your own database on EC2. Managed services handle updates, backups, and scaling, giving you more time to focus on your business instead of server administration. Third, enable encryption for sensitive data. If you're storing customer information, payment details, or personal data, encryption is essential. S3, RDS, and EBS all support encryption with just a checkbox — there's no reason not to use it. Fourth, tag your resources. Tags are labels you add to AWS resources, like "project: website" or "environment: production." Tags make it easy to track which resources belong to which project and help you understand your bill. Fifth, monitor with CloudWatch. Set up alerts for high CPU usage, low disk space, or application errors. This helps you catch problems before they affect users. Sixth, document your architecture. Keep notes on what each resource does, how they connect, and why you made certain decisions. This makes troubleshooting easier and helps if you need to hand off the project to someone else. Seventh, learn incrementally. Don't try to master all AWS services at once. Start with one service, like S3 or Lightsail, build something with it, then add another service. Build confidence through small wins rather than overwhelming yourself.

**Learner Check / Reflection:**
Which best practice will you implement first in your AWS journey?

---

### Slide 25: Mini Quiz

**Estimated Time:** 3 minutes

**Slide Content:**
- **Test Your Knowledge**
- 10 questions to reinforce what you've learned
- Take your time and think through each answer
- Explanations provided after each question

**Visual / Diagram Instruction:**
Simple, clean slide with quiz icon or question mark graphic. Use an engaging, friendly design.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Now let's test your knowledge with a mini quiz. This will help reinforce what you've learned and identify any areas where you might want to review. Take your time with each question — there's no rush. After each question, you'll see the correct answer with an explanation. This isn't about getting a perfect score; it's about learning and building confidence. Let's begin.

**Learner Check / Reflection:**
None.

---

### Slide 26: Scenario Exercise

**Estimated Time:** 3 minutes

**Slide Content:**
- **Real-World Scenario**
- Apply what you've learned to a practical business case
- Choose the right AWS services for specific requirements
- Compare your answer with the recommended solution

**Visual / Diagram Instruction:**
Show a business scenario with an illustration (e.g., a coffee shop or small business). Use a clean, professional design.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Now let's apply what you've learned to a real-world scenario. You'll be given a business case with specific requirements, and your task is to choose the right AWS services and estimate costs. This exercise simulates the kind of decision-making you'll do when planning your own projects. Take a few minutes to think through the scenario, then we'll review the recommended solution together.

**Learner Check / Reflection:**
None.

---

### Slide 27: Course Recap

**Estimated Time:** 2 minutes

**Slide Content:**
- **What You've Learned:**
- ✓ Cloud hosting vs traditional hosting
- ✓ AWS core services: Compute, Storage, Database, Networking, Security
- ✓ How to choose the right services for different scenarios
- ✓ Cost estimation and budgeting
- ✓ Scalability, availability, and security concepts
- ✓ Real-world hosting examples with architecture diagrams
- ✓ Common mistakes and best practices
- **You're now ready to:**
- Make informed decisions about cloud hosting
- Estimate costs for AWS projects
- Design basic hosting architectures
- Avoid common beginner pitfalls

**Visual / Diagram Instruction:**
Create a visual summary with icons representing each major topic covered. Use a circular or grid layout showing the journey from beginner to informed decision-maker.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
Congratulations! You've completed AWS and Cloud Hosting Fundamentals. Let's recap what you've learned. You now understand the fundamental difference between cloud hosting and traditional hosting — cloud hosting offers flexibility, scalability, and pay-as-you-go pricing. You've learned about AWS's core services: compute services like EC2, Lightsail, and Lambda; storage with S3 and EBS; databases with RDS and DynamoDB; networking with VPC, Route 53, and load balancers; and security with IAM and encryption. You can now choose the right services for different scenarios — whether it's a static website, a WordPress blog, a web application, or an e-commerce platform. You've learned to estimate costs and understand AWS's pricing model. You understand key concepts like scalability, availability, and security, and how AWS implements them through regions, availability zones, and the shared responsibility model. You've seen real-world hosting examples with detailed architecture diagrams and cost breakdowns. And you've learned common mistakes to avoid and best practices to follow. Most importantly, you're now ready to make informed decisions about cloud hosting for your own projects. You can estimate costs, design basic architectures, and avoid common pitfalls. This knowledge will serve you whether you're launching a personal project, building a business platform, or working with developers and IT professionals.

**Learner Check / Reflection:**
What's the most valuable thing you learned in this course?

---

### Slide 28: Next Steps

**Estimated Time:** 1.5 minutes

**Slide Content:**
- **Continue Your AWS Journey:**
- **1. Create a free AWS account**
  - Use the Free Tier to experiment without cost
  - Practice with real services
- **2. Build a simple project**
  - Start with a static website on S3
  - Or deploy WordPress on Lightsail
- **3. Explore AWS documentation**
  - AWS has excellent tutorials and guides
  - Follow step-by-step instructions
- **4. Join AWS communities**
  - AWS forums, Reddit r/aws, local meetups
  - Learn from others' experiences
- **5. Consider AWS certifications**
  - AWS Certified Cloud Practitioner (beginner)
  - Validates your knowledge, boosts career
- **6. Keep learning**
  - AWS constantly adds new services
  - Stay curious and experiment

**Visual / Diagram Instruction:**
Create a roadmap or path showing the progression from this course to mastery. Use a winding path with milestones, or a staircase showing each step. Include icons for each next step.

**Chart / Data Instruction:**
None.

**Speaker Notes:**
You've completed the course, but your AWS journey is just beginning. Here are your next steps. First, create a free AWS account if you haven't already. The Free Tier gives you 12 months of free access to many services — perfect for learning and experimentation. Second, build a simple project. Start with something manageable, like hosting a static website on S3 or deploying WordPress on Lightsail. Hands-on practice is the best way to solidify your knowledge. Third, explore AWS documentation. AWS provides excellent tutorials, guides, and step-by-step instructions for every service. The documentation is comprehensive and beginner-friendly. Fourth, join AWS communities. The AWS forums, Reddit's r/aws community, and local AWS meetups are great places to ask questions, share experiences, and learn from others. Fifth, consider AWS certifications. The AWS Certified Cloud Practitioner certification is designed for beginners and validates your foundational knowledge. It's valuable for your resume and career development. Sixth, keep learning. AWS constantly adds new services and features. Stay curious, experiment with new services, and continue building your skills. Remember, everyone starts as a beginner. The key is to start small, practice consistently, and build confidence through hands-on experience. You now have the foundation — go build something amazing!

**Learner Check / Reflection:**
What project will you build first with AWS?

---

## Mini Quiz

### Question 1
**What is the main advantage of cloud hosting over traditional hosting?**

A) Cloud hosting is always cheaper
B) Cloud hosting requires no technical knowledge
C) Cloud hosting offers flexibility and pay-as-you-go pricing
D) Cloud hosting never experiences downtime

**Correct Answer:** C

**Explanation:** Cloud hosting's main advantage is flexibility — you can scale resources up or down based on demand and only pay for what you use. While it can be cheaper, that's not always the case. It still requires some technical knowledge, and no hosting solution has zero downtime.

---

### Question 2
**What does AWS stand for?**

A) Advanced Web Services
B) Amazon Web Services
C) Automated Website Solutions
D) American Web Systems

**Correct Answer:** B

**Explanation:** AWS stands for Amazon Web Services. It's the cloud computing platform owned by Amazon, launched in 2006.

---

### Question 3
**Which AWS service would you use to host a simple static website?**

A) EC2
B) RDS
C) S3
D) Lambda

**Correct Answer:** C

**Explanation:** S3 (Simple Storage Service) can host static websites directly. It's the simplest and most cost-effective option for websites that only contain HTML, CSS, JavaScript, and images.

---

### Question 4
**What is the AWS Free Tier?**

A) A permanent free hosting plan
B) 12 months of free access to many AWS services for new accounts
C) A discount program for students only
D) Free technical support

**Correct Answer:** B

**Explanation:** The AWS Free Tier provides 12 months of free access to many AWS services for new accounts. This includes 750 hours of EC2, 5 GB of S3 storage, and more. It's designed to help you learn and experiment without cost.

---

### Question 5
**Which AWS service is best for beginners who want to host a WordPress website?**

A) EC2
B) Lambda
C) Lightsail
D) DynamoDB

**Correct Answer:** C

**Explanation:** Lightsail is AWS's simplified hosting service with predictable pricing, perfect for beginners. Lightsail bundles can start around $3.50–$5/month depending on whether you choose an IPv6-only or public-IPv4 bundle, the bundle size, the region, and current AWS pricing. *Approximate and region-dependent — verify on the official AWS Lightsail pricing page before purchase.*

---

### Question 6
**What does RDS stand for, and what is it used for?**

A) Rapid Deployment Service - for quick server setup
B) Relational Database Service - for hosting databases
C) Remote Data Storage - for file backups
D) Real-time Data Sync - for data synchronization

**Correct Answer:** B

**Explanation:** RDS stands for Relational Database Service. It's used for hosting databases like MySQL, PostgreSQL, SQL Server, and Oracle. RDS handles backups, updates, and scaling automatically.

---

### Question 7
**In the AWS Shared Responsibility Model, who is responsible for ensuring customer data is encrypted?**

A) AWS is fully responsible
B) The customer is responsible (AWS provides the tools, including default encryption for some services, but the customer must enable and manage encryption appropriately)
C) It's shared equally between AWS and the customer
D) Neither party is responsible

**Correct Answer:** B

**Explanation:** In the Shared Responsibility Model, the customer is responsible for ensuring their data is encrypted appropriately. AWS now provides default encryption at rest for several services (such as S3 and EBS) and offers the tools (KMS, encryption settings) for everything else, but the customer is responsible for choosing and managing encryption that fits their data sensitivity and compliance requirements.

---

### Question 8
**What is an Availability Zone (AZ)?**

A) A geographic region like "US East"
B) A separate data center within a region
C) A time zone for scheduling backups
D) A pricing tier for AWS services

**Correct Answer:** B

**Explanation:** An Availability Zone is a separate data center within an AWS region, with its own power, cooling, and networking. Each region has 2-6 availability zones, providing redundancy and high availability.

---

### Question 9
**Which type of scaling means adding more servers rather than upgrading to a bigger server?**

A) Vertical scaling
B) Horizontal scaling
C) Diagonal scaling
D) Circular scaling

**Correct Answer:** B

**Explanation:** Horizontal scaling means adding more servers to handle increased load. Vertical scaling means upgrading to a bigger server. Horizontal scaling offers unlimited growth potential and is preferred for cloud applications.

---

### Question 10
**Approximately how much would it cost per month to host a small business WordPress website on AWS using Lightsail, S3, and Route 53?**

A) $1–$3/month
B) $7–$15/month
C) $50–$100/month
D) $200–$300/month

**Correct Answer:** B

**Explanation:** A small business WordPress site using Lightsail (entry bundles roughly $3.50–$10/month depending on bundle and region), S3 (~$1–$2), and Route 53 (~$0.50) would cost approximately $5–$15 per month all in. *Approximate and region-dependent — verify on the official AWS pricing pages before purchase.* Either way, Option B ($7–$15) is the closest answer in the choices given.

---

## Scenario Exercise

### Scenario: Coffee Shop Website

**Background:**
Maria owns a small coffee shop in Austin, Texas. She wants to create a website for her business with the following features:

**Requirements:**
- Display menu with prices and photos of coffee drinks and pastries
- Show shop location, hours, and contact information
- Allow customers to submit contact forms for catering inquiries
- Display Instagram feed of recent posts
- Blog section where Maria can post coffee tips and shop updates
- Custom domain: www.mariascoffeehouse.com
- Expected traffic: 200–500 visitors per day
- Budget: $20/month maximum

**Your Task:**
Choose the appropriate AWS services for Maria's website and estimate the monthly cost. Consider:
1. What type of website is this? (static, dynamic, e-commerce, etc.)
2. Does it need a database?
3. What compute service should be used?
4. What other AWS services are needed?
5. What will the total monthly cost be?

---

### Suggested Solution

**Analysis:**
Maria's coffee shop website is a small business site with dynamic content (blog, contact forms). It needs content management capabilities, making WordPress an ideal choice.

**Recommended AWS Architecture:**

1. **Lightsail (WordPress):** roughly $3.50–$5/month to start
   - Pre-configured WordPress hosting; entry bundles start around $3.50–$5/month depending on IPv6/public-IPv4 bundle and region
   - The familiar $5/month bundle includes 1 GB RAM, 40 GB SSD, 2 TB transfer
   - Perfect for 200–500 visitors/day
   - Easy to manage for non-technical users
   - *Verify current bundle pricing on the official Lightsail page*

2. **S3:** $1/month
   - Store menu photos, blog images, backups
   - Approximately 5 GB of images

3. **Route 53:** $0.50/month
   - Connect custom domain (mariascoffeehouse.com)
   - DNS management

4. **SES (Simple Email Service):** ~$0.01/month
   - Send contact form submissions
   - Approximately 100 emails/month
   - SES is roughly $0.10 per 1,000 outbound emails (excluding edge cases and region/configuration differences), so 100 emails comes to roughly one cent

**Total Monthly Cost:** ~$6.51/month (round to about $7)

**Why This Solution Works:**
- **Under budget:** ~$6.51 (round to ~$7) is well under Maria's $20/month budget
- **Easy to manage:** Lightsail provides a simple WordPress dashboard that Maria can use without technical knowledge
- **Scalable:** Can handle traffic growth without immediate changes
- **Professional:** Custom domain and reliable hosting create a professional impression
- **Feature-complete:** Supports all requirements (menu, blog, contact forms, Instagram integration via WordPress plugins)

**Setup Process:**
1. Create AWS account and use Free Tier for first 12 months (Lightsail first 3 months free)
2. Launch Lightsail WordPress instance
3. Install WordPress theme suitable for coffee shops
4. Add plugins for contact forms and Instagram feed
5. Upload menu photos to S3 and link from WordPress
6. Configure Route 53 to point mariascoffeehouse.com to Lightsail
7. Set up SES for contact form emails

**Alternative Solution (If Maria Wants Even Simpler):**
- Use Lightsail only (entry bundle roughly $3.50–$5/month depending on bundle and region) and skip S3 initially
- Store images directly in WordPress (within 40 GB limit)
- Use WordPress's built-in email functionality
- Total cost: roughly $4–$5.50/month (Lightsail + Route 53)
- *Approximate, region- and bundle-dependent — verify on official AWS pricing pages*

**Explanation:**
This solution balances cost, ease of use, and functionality. Lightsail is perfect for small business websites because it's affordable, simple to manage, and includes everything needed for WordPress. Maria doesn't need complex services like EC2, load balancers, or RDS — those would be over-engineering for her traffic level. The solution can easily scale if her business grows and traffic increases. She could upgrade to a larger Lightsail plan (roughly $10 or $20/month depending on the bundle and region) or eventually migrate to EC2 + RDS if needed.

---

## Final Recap

### Most Important Takeaways

**1. Cloud Hosting Fundamentals**
- Cloud hosting means renting computing resources over the internet instead of owning hardware
- Pay only for what you use with no upfront costs
- Scale up or down based on demand

**2. AWS Core Services**
- **Compute:** EC2 (full control), Lightsail (simple), Lambda (serverless)
- **Storage:** S3 (files, backups), EBS (server hard drives)
- **Database:** RDS (SQL databases), DynamoDB (NoSQL)
- **Networking:** Route 53 (DNS), Load Balancers, CloudFront (CDN)
- **Security:** IAM (permissions), Security Groups (firewalls), Encryption

**3. Choosing the Right Solution** *(All costs approximate, region- and usage-dependent. Verify on official AWS pricing pages before deployment.)*
- Static website → S3 + CloudFront (roughly $2–$6/month)
- WordPress site → Lightsail (roughly $5–$15/month all in; entry Lightsail bundles roughly $3.50–$5/month depending on bundle and region)
- Web application → EC2 + RDS (roughly $55–$100/month)
- E-commerce → EC2 + RDS Multi-AZ + Auto Scaling (roughly $140–$320/month)

**4. Cost Management**
- Use the Free Tier for 12 months to learn without spending
- Set up billing alerts to avoid surprises
- Stop or terminate unused resources
- Start small and scale as needed

**5. Best Practices**
- Never use root account for daily tasks — create IAM users
- Enable encryption for sensitive data
- Use managed services when possible (Lightsail, RDS)
- Monitor with CloudWatch
- Choose region closest to your users
- Tag resources for better organization

**6. Common Mistakes to Avoid**
- Leaving resources running when not needed
- Not enabling backups
- Opening all security group ports
- Over-engineering from the start
- Ignoring billing alerts

**7. The Path Forward**
- Create a free AWS account
- Build a simple project (static site or WordPress)
- Learn incrementally — master one service at a time
- Join AWS communities for support
- Consider AWS Certified Cloud Practitioner certification

---

## Slide Design Notes

### Visual Style Guidelines

**Color Palette:**
- **Primary:** Deep blue (#1A365D) - professional, trustworthy
- **Secondary:** Teal (#0891B2) - modern, tech-forward
- **Accent:** Orange (#F97316) - energetic, attention-grabbing
- **Neutral:** White (#FFFFFF) and light gray (#F3F4F6) for backgrounds
- **Text:** Dark gray (#1F2937) for body text, black (#000000) for headings

**Typography:**
- **Headings:** Bold, sans-serif font (e.g., Inter, Roboto, or Montserrat)
- **Body text:** Clean, readable sans-serif (e.g., Open Sans or Lato)
- **Font sizes:**
  - Slide titles: 36–44pt
  - Body text: 18–24pt
  - Speaker notes: 14–16pt

**Layout Principles:**
- **White space:** Use generous margins and spacing — don't crowd slides
- **Hierarchy:** Clear visual hierarchy with titles, subtitles, and body text
- **Consistency:** Use the same layout templates throughout
- **Alignment:** Left-align text for readability, center-align titles
- **Bullet points:** Maximum 5–7 bullets per slide, keep text concise

**Icon Style:**
- Use consistent icon set throughout (e.g., Feather Icons, Heroicons, or Font Awesome)
- Simple, line-based icons rather than complex illustrations
- Icons should support content, not distract from it
- Use consistent icon size and color

**Chart and Diagram Style:**
- **Clean and minimal:** Remove unnecessary gridlines and decorations
- **Color-coded:** Use distinct colors for different data series
- **Labeled clearly:** All axes, data points, and legends must be clearly labeled
- **Real numbers:** Use actual sample numbers (e.g., "$5/month", "1,000 visitors") not vague terms
- **Comparison charts:** Use side-by-side bars or tables for easy comparison

**Architecture Diagrams:**
- **Layered approach:** Show user layer, edge layer, application layer, data layer
- **Clear connections:** Use arrows to show data flow and relationships
- **Color coding:** Different colors for different service types (compute, storage, database, etc.)
- **Icons:** Use official AWS service icons where possible
- **Labels:** Clear service names and brief descriptions

**Image Guidelines:**
- Use high-quality, professional images
- Avoid cheesy stock photos — prefer abstract graphics or real screenshots
- Images should support learning, not just decorate
- Maintain consistent image style throughout

**Slide Transitions:**
- Simple, professional transitions (fade or none)
- Avoid distracting animations
- Keep focus on content, not effects

**Accessibility:**
- High contrast between text and background
- Font size large enough to read easily
- Color-blind friendly palette (don't rely solely on color to convey information)
- Alt text for all images and diagrams

**Professional Polish:**
- Consistent header/footer with course title and slide numbers
- Company logo (Jifunze.ai) in corner of each slide
- Clean, uncluttered design that looks premium
- Proofread all text for typos and grammar
- Test readability on different screen sizes

**Overall Feel:**
The deck should feel like a premium, paid training course — professional, modern, and worth the investment. It should be visually appealing without being flashy, informative without being overwhelming, and practical without being boring. Every slide should serve a clear purpose in the learning journey.

---

**End of Course**

Total Slide Count: 28 slides
Estimated Duration: 50–60 minutes (60 minutes if all speaker notes are read at a normal pace)
Level: Beginner
Format: Self-paced with speaker notes

---

## Publishing decision

This file is the **canonical draft** of the AWS Cloud Hosting Fundamentals course. It supersedes the three earlier files at the repository root (`AWS_Cloud_Hosting_Fundamentals_Course.md`, `AWS_COURSE_FULL_CONTENT_GUIDE.md`, `AWS_Cloud_Hosting_Fundamentals_Complete_Course.md`). **Do not delete those older files yet** — leave them in place until publication is confirmed and a deletion is explicitly approved.

Two viable packaging options for publication:

**Best current positioning — single 60-minute course.** Ship as "Cloud Hosting Fundamentals with AWS — a 60-minute beginner course." Pro: one self-contained deliverable that maps cleanly to the existing 28-slide deck and does not require structural changes. Con: 60 minutes is on the long side for a single sit, especially for non-technical learners.

**Alternative packaging — 4-module short pathway.** Split into four ~15-minute modules, each with its own quiz and reflection:

1. **Cloud Hosting Basics** (Slides 1–7, ~13 min)
2. **AWS Core Services** (Slides 8–15, ~20 min)
3. **Hosting Architectures and Costs** (Slides 16–22, ~16 min)
4. **Best Practices and Next Steps** (Slides 23–28, ~10 min)

Pro: more sellable units, learners can stop after Module 1 if they only need conceptual framing, each module is easier to commute-consume, and per-module quizzes give better retention signal. Con: requires light packaging work at publishing time. The slide content does not need to change to move from a single course to the pathway.

**Recommendation:** ship as the single 60-minute course for the first publication, then split into the 4-module pathway after the first cohort feedback if learners report the length is too much for a single sit.

---

## Source notes for editor

Before final publication, verify the pricing examples in this course against the current public pricing pages for each service. Recommended sources to consult during the editorial pass:

- **AWS Lightsail pricing** — confirm current entry-bundle rates (IPv6-only and public-IPv4) and region differences
- **Amazon SES pricing** — confirm outbound email rate and any regional variations
- **Amazon S3 pricing** — confirm S3 Standard and other storage tier rates by region
- **Amazon EBS pricing** — confirm gp3 and other volume-type rates by region
- **Amazon Aurora pricing** — confirm Serverless v2 and provisioned starting costs
- **Amazon EC2 pricing** — confirm t-family, m-family, and other instance pricing for the regions you will use
- **AWS Shared Responsibility Model** — confirm the framing on Slide 12 still matches the official model

When all six pricing pages have been verified, update the **"Last pricing review"** date at the top of this file. Source page names are sufficient here — there is no need to embed long URLs in learner-facing slide content.
