#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:8000/v1"
COMPANY_ID="tech-startup-inc"
COMPANY_NAME="Tech Startup Inc"
COMPANY_PASSWORD="company123"

echo -e "${BLUE}Creating company: $COMPANY_NAME${NC}"

# Create company with CEO admin
COMPANY_RESPONSE=$(curl -s -X POST "$BASE_URL/company" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "'$COMPANY_ID'",
    "name": "'$COMPANY_NAME'",
    "password": "'$COMPANY_PASSWORD'",
    "admin": {
      "id": "emp-001-ceo",
      "name": "Sarah Johnson",
      "role": "CEO",
      "password": "ceo123"
    }
  }')

echo -e "${GREEN}Company created${NC}"
TOKEN=$(echo $COMPANY_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Auth Token: $TOKEN"

# Helper function to create employee
create_employee() {
  local emp_id=$1
  local name=$2
  local role=$3
  local manager_id=$4

  if [ -z "$manager_id" ] || [ "$manager_id" == "null" ]; then
    # No manager (board member)
    curl -s -X POST "$BASE_URL/employee" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{
        "id": "'$emp_id'",
        "name": "'$name'",
        "role": "'$role'",
        "company_id": "'$COMPANY_ID'",
        "password": "pass123"
      }' > /dev/null
  else
    # Has manager
    curl -s -X POST "$BASE_URL/employee" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{
        "id": "'$emp_id'",
        "name": "'$name'",
        "role": "'$role'",
        "company_id": "'$COMPANY_ID'",
        "password": "pass123",
        "reports": "'$manager_id'"
      }' > /dev/null
  fi

  echo -e "${GREEN}✓${NC} Created: $name ($emp_id)"
}

echo -e "\n${BLUE}Creating organizational structure (30 employees)${NC}\n"

# Level 1: Department Heads (4) - reporting to CEO
echo "Level 1: Department Heads"
create_employee "emp-002-cto" "Mike Chen" "CTO" "emp-001-ceo"
create_employee "emp-003-cfo" "Lisa Anderson" "CFO" "emp-001-ceo"
create_employee "emp-004-coo" "James Wilson" "COO" "emp-001-ceo"
create_employee "emp-005-cmO" "Emma Davis" "CMO" "emp-001-ceo"

# Level 2: Engineering Managers (4) - reporting to CTO
echo -e "\nLevel 2: Engineering Managers"
create_employee "emp-006-em1" "David Kumar" "Engineering Manager" "emp-002-cto"
create_employee "emp-007-em2" "Rachel Green" "Engineering Manager" "emp-002-cto"

# Level 2: Finance Managers (2) - reporting to CFO
echo -e "Level 2: Finance Managers"
create_employee "emp-008-fm1" "Tom Brown" "Finance Manager" "emp-003-cfo"
create_employee "emp-009-fm2" "Nancy Garcia" "Finance Manager" "emp-003-cfo"

# Level 2: Operations Managers (2) - reporting to COO
echo -e "Level 2: Operations Managers"
create_employee "emp-010-om1" "Robert Taylor" "Operations Manager" "emp-004-coo"
create_employee "emp-011-om2" "Patricia White" "Operations Manager" "emp-004-coo"

# Level 3: Engineering Team 1 (5 engineers) - reporting to EM1
echo -e "\nLevel 3: Engineering Team 1"
create_employee "emp-012-eng1" "Alex Martinez" "Senior Engineer" "emp-006-em1"
create_employee "emp-013-eng2" "Sophie Turner" "Engineer" "emp-006-em1"
create_employee "emp-014-eng3" "Chris Anderson" "Engineer" "emp-006-em1"
create_employee "emp-015-eng4" "Jordan Lee" "Junior Engineer" "emp-006-em1"
create_employee "emp-016-eng5" "Casey Morgan" "Junior Engineer" "emp-006-em1"

# Level 3: Engineering Team 2 (4 engineers) - reporting to EM2
echo -e "Level 3: Engineering Team 2"
create_employee "emp-017-eng6" "Blake Harris" "Senior Engineer" "emp-007-em2"
create_employee "emp-018-eng7" "Morgan Jackson" "Engineer" "emp-007-em2"
create_employee "emp-019-eng8" "Taylor Nguyen" "Engineer" "emp-007-em2"
create_employee "emp-020-eng9" "Riley Clark" "Junior Engineer" "emp-007-em2"

# Level 3: Finance Team 1 (3 analysts) - reporting to FM1
echo -e "Level 3: Finance Team 1"
create_employee "emp-021-ana1" "Kevin Rodriguez" "Senior Analyst" "emp-008-fm1"
create_employee "emp-022-ana2" "Amanda Lewis" "Analyst" "emp-008-fm1"
create_employee "emp-023-ana3" "Brandon Hall" "Junior Analyst" "emp-008-fm1"

# Level 3: Finance Team 2 (3 analysts) - reporting to FM2
echo -e "Level 3: Finance Team 2"
create_employee "emp-024-ana4" "Stephanie Allen" "Senior Analyst" "emp-009-fm2"
create_employee "emp-025-ana5" "Marcus Young" "Analyst" "emp-009-fm2"
create_employee "emp-026-ana6" "Isabelle King" "Junior Analyst" "emp-009-fm2"

# Level 3: Operations Team 1 (2 specialists) - reporting to OM1
echo -e "Level 3: Operations Team 1"
create_employee "emp-027-ops1" "Daniel Scott" "Operations Specialist" "emp-010-om1"
create_employee "emp-028-ops2" "Victoria Green" "Coordinator" "emp-010-om1"

# Level 3: Operations Team 2 (2 specialists) - reporting to OM2
echo -e "Level 3: Operations Team 2"
create_employee "emp-029-ops3" "Nicholas Adams" "Operations Specialist" "emp-011-om2"
create_employee "emp-030-ops4" "Olivia Baker" "Coordinator" "emp-011-om2"

echo -e "\n${GREEN}✓ Dummy company with 30 employees created successfully!${NC}\n"

echo "Organizational Structure:"
echo "========================"
echo "CEO (Sarah Johnson - emp-001-ceo)"
echo "├── CTO (Mike Chen - emp-002-cto)"
echo "│   ├── EM1 (David Kumar - emp-006-em1)"
echo "│   │   └── 5 Engineers (emp-012 to emp-016)"
echo "│   └── EM2 (Rachel Green - emp-007-em2)"
echo "│       └── 4 Engineers (emp-017 to emp-020)"
echo "├── CFO (Lisa Anderson - emp-003-cfo)"
echo "│   ├── FM1 (Tom Brown - emp-008-fm1)"
echo "│   │   └── 3 Analysts (emp-021 to emp-023)"
echo "│   └── FM2 (Nancy Garcia - emp-009-fm2)"
echo "│       └── 3 Analysts (emp-024 to emp-026)"
echo "├── COO (James Wilson - emp-004-coo)"
echo "│   ├── OM1 (Robert Taylor - emp-010-om1)"
echo "│   │   └── 2 Specialists (emp-027 to emp-028)"
echo "│   └── OM2 (Patricia White - emp-011-om2)"
echo "│       └── 2 Specialists (emp-029 to emp-030)"
echo "└── CMO (Emma Davis - emp-005-cmo)"
echo ""
echo "Test Credentials:"
echo "=================="
echo "CEO Login:"
echo "  ID: emp-001-ceo"
echo "  Password: ceo123"
echo ""
echo "All other employees:"
echo "  Password: pass123"
echo ""
echo "Company:"
echo "  ID: tech-startup-inc"
echo "  Password: company123"
