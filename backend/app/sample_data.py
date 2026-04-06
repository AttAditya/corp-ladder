from hierarchy_engine import HierarchyNode


SAMPLE_HIERARCHY = [
    HierarchyNode("ceo", "Anika Rao", "Chief Executive Officer", "Executive"),
    HierarchyNode("cto", "Rohan Mehta", "Chief Technology Officer", "Executive", "ceo"),
    HierarchyNode("cpo", "Mira Patel", "Chief Product Officer", "Executive", "ceo"),
    HierarchyNode("coo", "Kabir Shah", "Chief Operating Officer", "Executive", "ceo"),
    HierarchyNode("eng-platform", "Neha Verma", "VP Platform Engineering", "Engineering", "cto"),
    HierarchyNode("eng-infra", "Arjun Iyer", "VP Infrastructure", "Engineering", "cto"),
    HierarchyNode("eng-data", "Sara Khan", "VP Data Systems", "Engineering", "cto"),
    HierarchyNode("prod-core", "Ishita Roy", "VP Core Product", "Product", "cpo"),
    HierarchyNode("prod-growth", "Vivaan Das", "VP Growth Product", "Product", "cpo"),
    HierarchyNode("ops-people", "Rhea Kapoor", "VP People Operations", "Operations", "coo"),
    HierarchyNode("ops-finance", "Dev Malhotra", "VP Finance Operations", "Operations", "coo"),
    HierarchyNode("platform-api", "Aarav Sen", "Director API Platform", "Engineering", "eng-platform"),
    HierarchyNode("platform-web", "Tara Nair", "Director Web Platform", "Engineering", "eng-platform"),
    HierarchyNode("infra-cloud", "Yash Bedi", "Director Cloud Reliability", "Engineering", "eng-infra"),
    HierarchyNode("infra-security", "Naina Gill", "Director Security Engineering", "Engineering", "eng-infra"),
    HierarchyNode("data-ml", "Kunal Arora", "Director ML Infrastructure", "Engineering", "eng-data"),
    HierarchyNode("data-analytics", "Pooja Sethi", "Director Analytics", "Engineering", "eng-data"),
    HierarchyNode("core-mobile", "Aditi Joshi", "Director Mobile Experience", "Product", "prod-core"),
    HierarchyNode("growth-analytics", "Reyansh Suri", "Director Growth Analytics", "Product", "prod-growth"),
]
