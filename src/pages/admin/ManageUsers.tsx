import { useEffect, useState } from 'react'

import {
    getAllUsers,
    updateUser,
    deleteUser,
} from '../../api/userApi'

import type { User } from '../../types/user'
import type { UserRole, UserStatus } from '../../types/auth'
import DashboardLayout from '../../components/common/DashboardLayout'

function ManageUsers() {

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const loadUsers = async () => {

        try {

            setLoading(true)
            setError('')

            const data = await getAllUsers()

            setUsers(data)

        } catch (error) {

            console.error(error)
            setError('Failed to load users.')

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleRoleChange = async (
        userId: number,
        role: UserRole
    ) => {

        try {

            const updatedUser = await updateUser(
                userId,
                { role }
            )

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? updatedUser
                        : user
                )
            )

        } catch (error) {

            console.error(error)
            alert('Failed to update user role.')

        }
    }

    const handleStatusChange = async (
        userId: number,
        status: UserStatus
    ) => {

        try {

            const updatedUser = await updateUser(
                userId,
                { status }
            )

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? updatedUser
                        : user
                )
            )

        } catch (error) {

            console.error(error)
            alert('Failed to update user status.')

        }
    }

    const handleDelete = async (userId: number) => {

        const confirmed = window.confirm(
            'Are you sure you want to delete this user?'
        )

        if (!confirmed) {
            return
        }

        try {

            await deleteUser(userId)

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user.id !== userId
                )
            )

        } catch (error) {

            console.error(error)
            alert('Failed to delete user.')

        }
    }

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-950 p-8 text-white">
                <p className="text-slate-400">
                    Loading users...
                </p>
            </div>
        )
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-950 p-8 text-white">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Manage Users
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage user accounts, roles, and account status.
                    </p>

                </div>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                        {error}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="border-b border-slate-800 bg-slate-900">

                                <tr>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        ID
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        User
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-800">

                                {users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-slate-800/50"
                                    >

                                        <td className="px-6 py-4 text-sm text-slate-400">
                                            #{user.id}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="font-medium text-white">
                                                {user.name}
                                            </div>

                                            <div className="text-sm text-slate-500">
                                                {user.phone || 'No phone'}
                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-300">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">

                                            <select
                                                value={user.role}
                                                onChange={(event) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        event.target.value as UserRole
                                                    )
                                                }
                                                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                                            >

                                                <option value="CUSTOMER">
                                                    CUSTOMER
                                                </option>

                                                <option value="SELLER">
                                                    SELLER
                                                </option>

                                                <option value="AGENT">
                                                    AGENT
                                                </option>

                                                <option value="ADMIN">
                                                    ADMIN
                                                </option>

                                            </select>

                                        </td>

                                        <td className="px-6 py-4">

                                            <select
                                                value={user.status}
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        user.id,
                                                        event.target.value as UserStatus
                                                    )
                                                }
                                                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                                            >

                                                <option value="ACTIVE">
                                                    ACTIVE
                                                </option>

                                                <option value="DISABLED">
                                                    DISABLED
                                                </option>

                                            </select>

                                        </td>

                                        <td className="px-6 py-4">

                                            <button
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="rounded-lg bg-red-600/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {users.length === 0 && (

                        <div className="px-6 py-12 text-center text-slate-500">
                            No users found.
                        </div>

                    )}

                </div>

            </div>
        </DashboardLayout>
    )
}

export default ManageUsers