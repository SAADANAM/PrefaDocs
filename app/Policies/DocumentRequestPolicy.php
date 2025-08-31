<?php

namespace App\Policies;

use App\Models\DocumentRequest;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentRequestPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Only admins can view all document requests
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, DocumentRequest $documentRequest): bool
    {
        // Users can view their own requests, admins can view all
        return $user->isAdmin() || $user->id === $documentRequest->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Any authenticated user can create document requests
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can update document requests (approve/reject)
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can delete document requests
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can restore document requests
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can permanently delete document requests
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can approve the document request.
     */
    public function approve(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can approve document requests
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can reject the document request.
     */
    public function reject(User $user, DocumentRequest $documentRequest): bool
    {
        // Only admins can reject document requests
        return $user->isAdmin();
    }
}
