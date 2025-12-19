# ========================================================================
# EMERGENCY CLEANUP SCRIPT FOR JIMMY'S DEVELOPMENT ENVIRONMENT
# Generated: December 19, 2025
# 
# READ THIS FIRST:
# ===============
# This script will:
# 1. Backup critical repositories with uncommitted changes
# 2. Remove the .git from your home directory (CRITICAL FIX)
# 3. Delete 306+ temporary repository clones
# 4. Create organized development structure
#
# REQUIREMENTS:
# - Run in PowerShell as Administrator
# - Review each section before uncommenting
# - Verify backups before proceeding
# ========================================================================

$ErrorActionPreference = "Stop"

Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "EMERGENCY CLEANUP SCRIPT - JIMMY'S DEVELOPMENT ENVIRONMENT" -ForegroundColor Cyan
Write-Host "Generated: December 19, 2025" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

# ========================================================================
# PHASE 1: CREATE BACKUPS (RUN THIS FIRST!)
# ========================================================================

function Backup-CriticalRepositories {
    Write-Host "`n[PHASE 1] Creating backups of critical repositories..." -ForegroundColor Yellow
    
    $BackupDir = "C:\backup-$(Get-Date -Format 'yyyy-MM-dd-HHmm')"
    
    if (Test-Path $BackupDir) {
        Write-Host "❌ Backup directory already exists: $BackupDir" -ForegroundColor Red
        $response = Read-Host "Do you want to use this directory anyway? (yes/no)"
        if ($response -ne "yes") {
            Write-Host "❌ Backup cancelled. Please delete or rename the existing backup directory." -ForegroundColor Red
            return $false
        }
    } else {
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
        Write-Host "✅ Created backup directory: $BackupDir" -ForegroundColor Green
    }
    
    # List of critical repositories with uncommitted changes
    $CriticalRepos = @(
        @{Path="C:\Users\jimmy\.cursor\agent-ui"; Name="agent-ui"; Uncommitted=1573},
        @{Path="C:\Users\jimmy\Desktop\repos\AIGuardians"; Name="AIGuardians"; Uncommitted=539},
        @{Path="C:\Users\jimmy\abe-core"; Name="abe-core"; Uncommitted=25},
        @{Path="C:\Users\jimmy\.vscode\Abeone-Wetware-Core"; Name="Abeone-Wetware-Core"; Uncommitted=10},
        @{Path="C:\Users\jimmy\.vscode\founders-hub"; Name="founders-hub"; Uncommitted=16},
        @{Path="C:\Users\jimmy\abeone-core"; Name="abeone-core"; Uncommitted=6}
    )
    
    Write-Host "`nBacking up repositories with uncommitted changes:" -ForegroundColor Yellow
    Write-Host "-" * 80
    
    $BackupCount = 0
    $TotalSize = 0
    
    foreach ($repo in $CriticalRepos) {
        if (Test-Path $repo.Path) {
            $dest = Join-Path $BackupDir $repo.Name
            Write-Host "`n  📦 Backing up: $($repo.Name)" -ForegroundColor Cyan
            Write-Host "      Source: $($repo.Path)" -ForegroundColor Gray
            Write-Host "      Uncommitted changes: $($repo.Uncommitted)" -ForegroundColor Gray
            
            try {
                Copy-Item -Path $repo.Path -Destination $dest -Recurse -Force
                
                $size = (Get-ChildItem $dest -Recurse | Measure-Object -Property Length -Sum).Sum
                $sizeMB = [math]::Round($size / 1MB, 2)
                $TotalSize += $size
                
                Write-Host "      ✅ Backed up successfully ($sizeMB MB)" -ForegroundColor Green
                $BackupCount++
            } catch {
                Write-Host "      ❌ BACKUP FAILED: $_" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "`n  ⚠️  Repository not found: $($repo.Name)" -ForegroundColor Yellow
            Write-Host "      Expected at: $($repo.Path)" -ForegroundColor Gray
        }
    }
    
    Write-Host "`n" + ("=" * 80)
    Write-Host "✅ PHASE 1 COMPLETE - BACKUPS CREATED" -ForegroundColor Green
    Write-Host "   Repositories backed up: $BackupCount" -ForegroundColor Green
    Write-Host "   Total backup size: $([math]::Round($TotalSize / 1MB, 2)) MB" -ForegroundColor Green
    Write-Host "   Backup location: $BackupDir" -ForegroundColor Green
    Write-Host ("=" * 80)
    
    # Save backup manifest
    $Manifest = @{
        Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        BackupDirectory = $BackupDir
        RepositoriesBackedUp = $BackupCount
        TotalSizeMB = [math]::Round($TotalSize / 1MB, 2)
        Repositories = $CriticalRepos
    }
    
    $Manifest | ConvertTo-Json -Depth 10 | Out-File "$BackupDir\backup-manifest.json"
    Write-Host "`n   📄 Backup manifest saved to: $BackupDir\backup-manifest.json" -ForegroundColor Cyan
    
    return $true
}

# ========================================================================
# PHASE 2: ANALYZE HOME DIRECTORY GIT
# ========================================================================

function Analyze-HomeDirectoryGit {
    Write-Host "`n[PHASE 2] Analyzing home directory git configuration..." -ForegroundColor Yellow
    
    $HomeGitDir = "C:\Users\jimmy\.git"
    
    if (-not (Test-Path $HomeGitDir)) {
        Write-Host "✅ Good news! No .git directory found in home directory." -ForegroundColor Green
        return $null
    }
    
    Write-Host "🔴 CRITICAL: Found .git in home directory!" -ForegroundColor Red
    
    try {
        Push-Location "C:\Users\jimmy"
        
        # Get git status
        Write-Host "`n  Analyzing git repository..." -ForegroundColor Cyan
        
        $remote = git remote get-url origin 2>$null
        Write-Host "    Remote: $remote" -ForegroundColor Gray
        
        $branch = git branch --show-current 2>$null
        Write-Host "    Branch: $branch" -ForegroundColor Gray
        
        $uncommittedCount = (git status --short 2>$null | Measure-Object).Count
        Write-Host "    Uncommitted files: $uncommittedCount" -ForegroundColor Gray
        
        # Save git status to file
        $AnalysisFile = "C:\Users\jimmy\home-git-analysis.txt"
        git status > $AnalysisFile 2>&1
        git log --oneline -20 >> $AnalysisFile 2>&1
        
        Write-Host "`n  ✅ Git analysis saved to: $AnalysisFile" -ForegroundColor Green
        
        Pop-Location
        
        return @{
            GitDir = $HomeGitDir
            Remote = $remote
            Branch = $branch
            UncommittedCount = $uncommittedCount
            AnalysisFile = $AnalysisFile
        }
        
    } catch {
        Write-Host "    ⚠️  Error analyzing git: $_" -ForegroundColor Yellow
        Pop-Location
        return $null
    }
}

# ========================================================================
# PHASE 3: REMOVE HOME DIRECTORY .GIT (CRITICAL FIX)
# ========================================================================

function Remove-HomeDirectoryGit {
    param(
        [Parameter(Mandatory=$true)]
        [bool]$Confirmed
    )
    
    Write-Host "`n[PHASE 3] Removing home directory .git..." -ForegroundColor Yellow
    
    if (-not $Confirmed) {
        Write-Host "❌ Skipping - not confirmed by user" -ForegroundColor Red
        return $false
    }
    
    $HomeGitDir = "C:\Users\jimmy\.git"
    
    if (-not (Test-Path $HomeGitDir)) {
        Write-Host "✅ No .git directory to remove" -ForegroundColor Green
        return $true
    }
    
    try {
        Write-Host "  🗑️  Removing: $HomeGitDir" -ForegroundColor Cyan
        Remove-Item -Path $HomeGitDir -Recurse -Force
        Write-Host "  ✅ Successfully removed home directory .git" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  ❌ Failed to remove: $_" -ForegroundColor Red
        return $false
    }
}

# ========================================================================
# PHASE 4: DELETE TEMPORARY REPOSITORY CLONES
# ========================================================================

function Remove-TemporaryRepositories {
    Write-Host "`n[PHASE 4] Cleaning up temporary repository clones..." -ForegroundColor Yellow
    
    $TempPath = "C:\Users\jimmy\AppData\Local\Temp"
    
    Write-Host "  Scanning for temporary repositories..." -ForegroundColor Cyan
    
    $tempRepos = Get-ChildItem $TempPath -Directory -Filter "tmp*" -ErrorAction SilentlyContinue | 
        Where-Object { Test-Path "$($_.FullName)\.git" }
    
    $count = ($tempRepos | Measure-Object).Count
    
    if ($count -eq 0) {
        Write-Host "  ✅ No temporary repositories found" -ForegroundColor Green
        return $true
    }
    
    $totalSize = ($tempRepos | Get-ChildItem -Recurse -ErrorAction SilentlyContinue | 
        Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($totalSize / 1MB, 2)
    
    Write-Host "`n  Found: $count temporary repositories" -ForegroundColor Yellow
    Write-Host "  Total size: $sizeMB MB" -ForegroundColor Yellow
    
    $response = Read-Host "`n  Delete all temporary repositories? (yes/no)"
    
    if ($response -ne "yes") {
        Write-Host "  ❌ Cleanup cancelled" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n  🗑️  Deleting temporary repositories..." -ForegroundColor Cyan
    
    $deleted = 0
    foreach ($repo in $tempRepos) {
        try {
            Remove-Item $repo.FullName -Recurse -Force -ErrorAction Stop
            $deleted++
            if ($deleted % 50 -eq 0) {
                Write-Host "    Progress: $deleted/$count deleted..." -ForegroundColor Gray
            }
        } catch {
            Write-Host "    ⚠️  Failed to delete: $($repo.Name)" -ForegroundColor Yellow
        }
    }
    
    Write-Host "`n  ✅ Deleted $deleted/$count repositories ($sizeMB MB freed)" -ForegroundColor Green
    return $true
}

# ========================================================================
# PHASE 5: CREATE ORGANIZED DEVELOPMENT STRUCTURE
# ========================================================================

function Create-OrganizedStructure {
    Write-Host "`n[PHASE 5] Creating organized development structure..." -ForegroundColor Yellow
    
    $DevRoot = "C:\dev\jimmy"
    
    $Directories = @(
        "$DevRoot",
        "$DevRoot\github-jimmyjdejesus-cmyk",
        "$DevRoot\github-Jimmy-Dejesus",
        "$DevRoot\github-orgs",
        "$DevRoot\github-orgs\BravettoBackendTeam",
        "$DevRoot\github-orgs\bravetto",
        "$DevRoot\github-orgs\NS-AI-Suite",
        "$DevRoot\github-orgs\Marketing-Automation-Suite",
        "$DevRoot\github-orgs\SysDesign-As-Code-SDaC",
        "$DevRoot\abe-ecosystem",
        "$DevRoot\research",
        "$DevRoot\production",
        "$DevRoot\tools",
        "$DevRoot\archived"
    )
    
    Write-Host "  Creating directory structure at: $DevRoot" -ForegroundColor Cyan
    
    $created = 0
    foreach ($dir in $Directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            $created++
        }
    }
    
    Write-Host "`n  ✅ Created $created new directories" -ForegroundColor Green
    
    # Create README in root
    $ReadmeContent = @"
# Jimmy's Organized Development Environment

Created: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Structure

- **github-jimmyjdejesus-cmyk/** - Personal repos from jimmyjdejesus-cmyk account
- **github-Jimmy-Dejesus/** - Personal repos from Jimmy-Dejesus account
- **github-orgs/** - Organization repositories
  - BravettoBackendTeam/ (149-agent swarm)
  - bravetto/ (Commercial products)
  - NS-AI-Suite/ (Enterprise AI agents)
  - Marketing-Automation-Suite/ (Marketing platform)
  - SysDesign-As-Code-SDaC/ (System design tools)
- **abe-ecosystem/** - All Abe/Abeone related projects
- **research/** - Research projects and experiments
- **production/** - Production-ready deployments
- **tools/** - Development tools and utilities
- **archived/** - Archived/inactive projects

## Next Steps

1. Move repositories from scattered locations to organized structure
2. Update git remotes if needed
3. Verify all repositories work in new locations
4. Update development workflows

## Original Locations

Repositories were previously scattered across:
- C:\Users\jimmy\.cursor\
- C:\Users\jimmy\.vscode\
- C:\Users\jimmy\abe-core\
- C:\Users\jimmy\Desktop\repos\
- C:\Users\jimmy\Documents\GitHub\
- C:\Users\jimmy\PycharmProjects\
- And many more...

"@
    
    $ReadmeContent | Out-File "$DevRoot\README.md"
    Write-Host "  📄 Created README at: $DevRoot\README.md" -ForegroundColor Cyan
    
    return $true
}

# ========================================================================
# PHASE 6: GENERATE REPOSITORY MOVE PLAN
# ========================================================================

function Generate-MoveP lan {
    Write-Host "`n[PHASE 6] Generating repository move plan..." -ForegroundColor Yellow
    
    $DevRoot = "C:\dev\jimmy"
    $MovePlanFile = "$DevRoot\REPOSITORY-MOVE-PLAN.md"
    
    $MovePlan = @"
# Repository Move Plan

Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## ⚠️ IMPORTANT: DO NOT EXECUTE THIS YET!

Review this plan first. Make sure:
1. All uncommitted changes are committed or stashed
2. You understand where each repository will move
3. You have backups of critical repositories
4. You've tested the workflow with one repository first

## Repositories to Move

### From C:\Users\jimmy\.cursor\

#### agent-ui
- **Current**: C:\Users\jimmy\.cursor\agent-ui
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\agent-ui
- **Uncommitted**: 1573 files
- **Action**: Commit or stash first!
- **Command**:
``````powershell
cd C:\Users\jimmy\.cursor\agent-ui
git status
# Review changes, then either:
git add -A && git commit -m "WIP: Backup before move"
# OR
git stash save "WIP before move $(Get-Date -Format 'yyyy-MM-dd')"
# Then move:
Move-Item -Path C:\Users\jimmy\.cursor\agent-ui -Destination C:\dev\jimmy\github-jimmyjdejesus-cmyk\agent-ui
``````

#### jimmys-tool-stacks-portfolio
- **Current**: C:\Users\jimmy\.cursor\jimmys-tool-stacks-portfolio
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\jimmys-tool-stacks-portfolio
- **Uncommitted**: 1 file
- **Action**: Commit first
- **Command**:
``````powershell
cd C:\Users\jimmy\.cursor\jimmys-tool-stacks-portfolio
git add -A && git commit -m "Update before reorganization"
Move-Item -Path C:\Users\jimmy\.cursor\jimmys-tool-stacks-portfolio -Destination C:\dev\jimmy\github-jimmyjdejesus-cmyk\jimmys-tool-stacks-portfolio
``````

### From C:\Users\jimmy\.vscode\

#### Abeone-Wetware-Core
- **Current**: C:\Users\jimmy\.vscode\Abeone-Wetware-Core
- **Target**: C:\dev\jimmy\abe-ecosystem\Abeone-Wetware-Core
- **Uncommitted**: 10 files
- **Action**: Review and commit

#### founders-hub
- **Current**: C:\Users\jimmy\.vscode\founders-hub
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\founders-hub
- **Uncommitted**: 16 files
- **Action**: Review and commit

### From C:\Users\jimmy\abe-core\

#### abe-core (root)
- **Current**: C:\Users\jimmy\abe-core
- **Target**: C:\dev\jimmy\abe-ecosystem\abe-core
- **Uncommitted**: 25 files
- **Action**: Review and commit
- **Note**: Contains extracted-repositories subdirectory - move entire structure

### From C:\Users\jimmy\Desktop\repos\

#### AIGuardians
- **Current**: C:\Users\jimmy\Desktop\repos\AIGuardians
- **Target**: C:\dev\jimmy\github-Jimmy-Dejesus\AIGuardians
- **Uncommitted**: 539 files (mostly deletions)
- **Action**: Review deletions carefully!

#### BiasGuard
- **Current**: C:\Users\jimmy\Desktop\repos\services\BiasGuard
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\BiasGuard

#### ContextGuard
- **Current**: C:\Users\jimmy\Desktop\repos\services\ContextGuard
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\ContextGuard

### From C:\Users\jimmy\Documents\GitHub\

#### Jarvis_AI
- **Current**: C:\Users\jimmy\Documents\GitHub\Jarvis_AI
- **Target**: C:\dev\jimmy\github-jimmyjdejesus-cmyk\Jarvis_AI
- **Status**: Clean (0 uncommitted)

### From C:\Users\jimmy\PycharmProjects\

#### Jarvis_AI (Janus_Ai)
- **Current**: C:\Users\jimmy\PycharmProjects\Jarvis_AI
- **Target**: Investigate - duplicate of above?
- **Action**: Compare with Documents/GitHub/Jarvis_AI first

## Step-by-Step Move Process

### For Each Repository:

1. **Navigate to repository**:
   ``````powershell
   cd [current-path]
   ``````

2. **Check status**:
   ``````powershell
   git status
   git remote -v
   ``````

3. **Handle uncommitted changes**:
   - If changes are important: Commit them
   - If work-in-progress: Stash them
   - If junk: Clean them

4. **Move repository**:
   ``````powershell
   Move-Item -Path [current-path] -Destination [new-path]
   ``````

5. **Verify new location**:
   ``````powershell
   cd [new-path]
   git status
   git remote -v
   git log --oneline -5
   ``````

6. **Test basic operations**:
   ``````powershell
   git fetch
   git pull
   # Make a small change and commit to test push access
   ``````

## Automation Script (Use with Caution!)

``````powershell
# Example for ONE repository - test first!
function Move-Repository {
    param($Source, $Destination, $Name)
    
    Write-Host "Moving $Name..." -ForegroundColor Cyan
    
    if (-not (Test-Path $Source)) {
        Write-Host "  ❌ Source not found: $Source" -ForegroundColor Red
        return
    }
    
    Push-Location $Source
    $uncommitted = (git status --short 2>$null | Measure-Object).Count
    
    if ($uncommitted -gt 0) {
        Write-Host "  ⚠️  Has $uncommitted uncommitted changes - skipping" -ForegroundColor Yellow
        Pop-Location
        return
    }
    
    Pop-Location
    
    try {
        Move-Item -Path $Source -Destination $Destination -Force
        Write-Host "  ✅ Moved to $Destination" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ Failed: $_" -ForegroundColor Red
    }
}

# Test with ONE repository first:
# Move-Repository -Source "C:\Users\jimmy\Documents\GitHub\Jarvis_AI" -Destination "C:\dev\jimmy\github-jimmyjdejesus-cmyk\Jarvis_AI" -Name "Jarvis_AI"
``````

## After Moving All Repositories

1. Update IDE/editor workspaces
2. Update any hardcoded paths in scripts
3. Update git hooks if any
4. Update CI/CD configurations
5. Test all development workflows
6. Document new structure

## Rollback Plan

If something goes wrong:
1. Restore from backup: C:\backup-[timestamp]\
2. Move repositories back to original locations
3. Verify git remotes
4. Test operations

"@
    
    $MovePlan | Out-File $MovePlanFile
    Write-Host "  ✅ Move plan generated: $MovePlanFile" -ForegroundColor Green
    
    return $true
}

# ========================================================================
# MAIN EXECUTION
# ========================================================================

function Start-EmergencyCleanup {
    Write-Host "`n"
    Write-Host "⚠️⚠️⚠️ EMERGENCY CLEANUP SCRIPT ⚠️⚠️⚠️" -ForegroundColor Red -BackgroundColor Yellow
    Write-Host "`nThis script will make significant changes to your development environment." -ForegroundColor Yellow
    Write-Host "Make sure you understand what it does before proceeding.`n" -ForegroundColor Yellow
    
    $response = Read-Host "Do you want to proceed? (yes/no)"
    
    if ($response -ne "yes") {
        Write-Host "`n❌ Cleanup cancelled by user" -ForegroundColor Red
        return
    }
    
    # PHASE 1: Backups
    Write-Host "`n"
    $backupSuccess = Backup-CriticalRepositories
    
    if (-not $backupSuccess) {
        Write-Host "`n❌ BACKUP FAILED - STOPPING IMMEDIATELY" -ForegroundColor Red
        Write-Host "Fix backup issues before continuing!" -ForegroundColor Red
        return
    }
    
    Write-Host "`nPress any key to continue to Phase 2..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # PHASE 2: Analyze
    $homeGitAnalysis = Analyze-HomeDirectoryGit
    
    # PHASE 3: Remove home directory .git
    if ($homeGitAnalysis) {
        Write-Host "`n⚠️  CRITICAL ACTION REQUIRED" -ForegroundColor Red -BackgroundColor Yellow
        Write-Host "`nYour home directory contains a .git repository." -ForegroundColor Yellow
        Write-Host "This is VERY BAD and needs to be removed." -ForegroundColor Yellow
        Write-Host "`nGit analysis saved to: $($homeGitAnalysis.AnalysisFile)" -ForegroundColor Cyan
        Write-Host "`nReview the analysis file, then confirm removal." -ForegroundColor Yellow
        
        $confirmRemove = Read-Host "`nRemove .git from home directory? (I UNDERSTAND THE RISK/no)"
        
        if ($confirmRemove -eq "I UNDERSTAND THE RISK") {
            Remove-HomeDirectoryGit -Confirmed $true
        } else {
            Write-Host "  ⚠️  Skipping home directory .git removal" -ForegroundColor Yellow
            Write-Host "  You MUST fix this manually later!" -ForegroundColor Red
        }
    }
    
    Write-Host "`nPress any key to continue to Phase 4..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # PHASE 4: Remove temp repos
    Remove-TemporaryRepositories
    
    Write-Host "`nPress any key to continue to Phase 5..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # PHASE 5: Create structure
    Create-OrganizedStructure
    
    # PHASE 6: Generate move plan
    Generate-MovePlan
    
    Write-Host "`n"
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host "✅ EMERGENCY CLEANUP COMPLETE!" -ForegroundColor Green
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host "`n"
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Review backup at: C:\backup-[timestamp]\" -ForegroundColor Gray
    Write-Host "2. Review move plan at: C:\dev\jimmy\REPOSITORY-MOVE-PLAN.md" -ForegroundColor Gray
    Write-Host "3. Manually move repositories following the plan" -ForegroundColor Gray
    Write-Host "4. Update documentation with correct repository counts" -ForegroundColor Gray
    Write-Host "5. Test development workflow in new structure" -ForegroundColor Gray
    Write-Host "`n"
}

# ========================================================================
# SCRIPT ENTRY POINT
# ========================================================================

# Uncomment the line below to run the full cleanup:
# Start-EmergencyCleanup

Write-Host "`n⚠️  SAFETY MODE: Script loaded but not executed" -ForegroundColor Yellow
Write-Host "To run the cleanup, uncomment the Start-EmergencyCleanup call at the end of this script`n" -ForegroundColor Yellow


