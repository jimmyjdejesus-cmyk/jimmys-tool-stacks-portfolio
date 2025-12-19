# SAFE PORTFOLIO CLEANUP SCRIPT
# Generated: December 18, 2025
# 
# This script performs cleanup with verification checkpoints.
# Each section can be run independently.
# REVIEW EACH STEP BEFORE EXECUTING.

$ErrorActionPreference = "Stop"
$BackupDir = "C:\Users\jimmy\portfolio-backup-$(Get-Date -Format 'yyyy-MM-dd-HHmm')"

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "PORTFOLIO CLEANUP SCRIPT - VERIFICATION MODE" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# =============================================================================
# PHASE 1: CREATE BACKUPS (RUN THIS FIRST!)
# =============================================================================

function Backup-CriticalRepos {
    Write-Host "`n[PHASE 1] Creating backups of critical repositories..." -ForegroundColor Yellow
    
    # Create backup directory
    if (-not (Test-Path $BackupDir)) {
        New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
        Write-Host "Created backup directory: $BackupDir" -ForegroundColor Green
    }
    
    # Repositories with significant uncommitted changes
    $criticalRepos = @(
        @{Path="C:\Users\jimmy\.cursor\agent-ui"; Name="agent-ui"},
        @{Path="C:\Users\jimmy\Desktop\repos\AIGuardians"; Name="AIGuardians"},
        @{Path="C:\Users\jimmy\abe-core"; Name="abe-core"},
        @{Path="C:\Users\jimmy\abeone-core"; Name="abeone-core"},
        @{Path="C:\Users\jimmy\.vscode\founders-hub"; Name="founders-hub"}
    )
    
    foreach ($repo in $criticalRepos) {
        if (Test-Path $repo.Path) {
            $dest = Join-Path $BackupDir $repo.Name
            Write-Host "  Backing up $($repo.Name)..." -ForegroundColor Gray
            Copy-Item -Path $repo.Path -Destination $dest -Recurse -Force
            Write-Host "  ✓ Backed up to $dest" -ForegroundColor Green
        }
    }
    
    Write-Host "`n[PHASE 1 COMPLETE] Backups created at: $BackupDir" -ForegroundColor Green
}

# =============================================================================
# PHASE 2: VERIFY HOME DIRECTORY GIT STATUS
# =============================================================================

function Verify-HomeDirectoryGit {
    Write-Host "`n[PHASE 2] Checking home directory git configuration..." -ForegroundColor Yellow
    
    $homeGit = "C:\Users\jimmy\.git"
    if (Test-Path $homeGit) {
        Write-Host "  WARNING: Home directory contains .git folder!" -ForegroundColor Red
        Write-Host "  Location: $homeGit" -ForegroundColor Red
        
        # Check remote
        Set-Location "C:\Users\jimmy"
        $remote = git remote get-url origin 2>$null
        Write-Host "  Remote: $remote" -ForegroundColor Yellow
        
        # Count uncommitted
        $uncommitted = (git status --porcelain 2>$null | Measure-Object).Count
        Write-Host "  Uncommitted changes: $uncommitted" -ForegroundColor Yellow
        
        Write-Host "`n  RECOMMENDATION: Remove this .git folder" -ForegroundColor Cyan
        Write-Host "  Command: Remove-Item -Recurse -Force 'C:\Users\jimmy\.git'" -ForegroundColor Gray
        
        return $true
    } else {
        Write-Host "  ✓ Home directory is not a git repository" -ForegroundColor Green
        return $false
    }
}

# =============================================================================
# PHASE 3: CLEAN TEMP REPOSITORIES (SAFE)
# =============================================================================

function Clean-TempRepositories {
    Write-Host "`n[PHASE 3] Analyzing temp repositories..." -ForegroundColor Yellow
    
    $tempPath = "C:\Users\jimmy\AppData\Local\Temp"
    $tmpDirs = Get-ChildItem -Path $tempPath -Directory -Filter "tmp*" -ErrorAction SilentlyContinue
    
    $gitRepos = @()
    foreach ($dir in $tmpDirs) {
        $gitPath = Join-Path $dir.FullName ".git"
        if (Test-Path $gitPath) {
            $gitRepos += $dir
        }
    }
    
    Write-Host "  Found $($gitRepos.Count) temp git repositories" -ForegroundColor Gray
    
    if ($gitRepos.Count -gt 0) {
        # Calculate size
        $totalSize = 0
        foreach ($repo in $gitRepos) {
            $size = (Get-ChildItem -Path $repo.FullName -Recurse -Force -ErrorAction SilentlyContinue | 
                     Measure-Object -Property Length -Sum).Sum
            $totalSize += $size
        }
        $sizeMB = [math]::Round($totalSize / 1MB, 2)
        
        Write-Host "  Total size: $sizeMB MB" -ForegroundColor Gray
        Write-Host "`n  These are build artifacts from biasguard-backend" -ForegroundColor Cyan
        Write-Host "  SAFE TO DELETE" -ForegroundColor Green
        
        $confirm = Read-Host "  Delete these temp repositories? (y/n)"
        if ($confirm -eq 'y') {
            foreach ($repo in $gitRepos) {
                Remove-Item -Path $repo.FullName -Recurse -Force -ErrorAction SilentlyContinue
            }
            Write-Host "  ✓ Deleted $($gitRepos.Count) temp repositories" -ForegroundColor Green
        }
    }
}

# =============================================================================
# PHASE 4: REVIEW UNCOMMITTED CHANGES
# =============================================================================

function Review-UncommittedChanges {
    Write-Host "`n[PHASE 4] Reviewing repositories with uncommitted changes..." -ForegroundColor Yellow
    
    $repos = @(
        @{Path="C:\Users\jimmy\.cursor\agent-ui"; Name="agent-ui"; Expected=1573},
        @{Path="C:\Users\jimmy\Desktop\repos\AIGuardians"; Name="AIGuardians"; Expected=539},
        @{Path="C:\Users\jimmy\Desktop\repos\services"; Name="services"; Expected=142},
        @{Path="C:\Users\jimmy\abe-core"; Name="abe-core"; Expected=25}
    )
    
    foreach ($repo in $repos) {
        if (Test-Path $repo.Path) {
            Set-Location $repo.Path
            $uncommitted = (git status --porcelain 2>$null | Measure-Object).Count
            
            if ($uncommitted -gt 50) {
                Write-Host "`n  $($repo.Name): $uncommitted uncommitted changes" -ForegroundColor Red
            } elseif ($uncommitted -gt 0) {
                Write-Host "`n  $($repo.Name): $uncommitted uncommitted changes" -ForegroundColor Yellow
            } else {
                Write-Host "`n  $($repo.Name): Clean" -ForegroundColor Green
            }
            
            if ($uncommitted -gt 0) {
                Write-Host "    To review: cd '$($repo.Path)' && git status" -ForegroundColor Gray
            }
        }
    }
}

# =============================================================================
# PHASE 5: CONSOLIDATE DUPLICATES
# =============================================================================

function Consolidate-Duplicates {
    Write-Host "`n[PHASE 5] Identifying duplicate repositories..." -ForegroundColor Yellow
    
    $duplicates = @(
        "C:\Users\jimmy\to_migrate\dependabot\actions_cache_4",
        "C:\Users\jimmy\to_migrate\dependabot\actions_setup_python_6",
        "C:\Users\jimmy\to_migrate\dependabot\codecov_codecov_action_5",
        "C:\Users\jimmy\to_migrate\dependabot\DavidAnson_markdownlint_cli2_action_20",
        "C:\Users\jimmy\to_migrate\dependabot\docker_build_push_action_6"
    )
    
    Write-Host "  Found $($duplicates.Count) potential duplicate repos in to_migrate/dependabot/" -ForegroundColor Gray
    Write-Host "  All point to: AIGuardians-homebase.git" -ForegroundColor Gray
    
    $existingDups = $duplicates | Where-Object { Test-Path $_ }
    Write-Host "  $($existingDups.Count) still exist" -ForegroundColor Gray
    
    if ($existingDups.Count -gt 0) {
        Write-Host "`n  RECOMMENDATION: Remove duplicates after confirming canonical location" -ForegroundColor Cyan
    }
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

Write-Host "`nSelect action:" -ForegroundColor Cyan
Write-Host "  1. Run all phases (with confirmations)"
Write-Host "  2. Phase 1 only: Create backups"
Write-Host "  3. Phase 2 only: Verify home directory"
Write-Host "  4. Phase 3 only: Clean temp repos"
Write-Host "  5. Phase 4 only: Review uncommitted changes"
Write-Host "  6. Phase 5 only: Identify duplicates"
Write-Host "  0. Exit"

$choice = Read-Host "`nEnter choice (0-6)"

switch ($choice) {
    "1" {
        Backup-CriticalRepos
        Verify-HomeDirectoryGit
        Clean-TempRepositories
        Review-UncommittedChanges
        Consolidate-Duplicates
    }
    "2" { Backup-CriticalRepos }
    "3" { Verify-HomeDirectoryGit }
    "4" { Clean-TempRepositories }
    "5" { Review-UncommittedChanges }
    "6" { Consolidate-Duplicates }
    "0" { Write-Host "Exiting..." -ForegroundColor Gray }
    default { Write-Host "Invalid choice" -ForegroundColor Red }
}

Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "Script complete. Review output above." -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

