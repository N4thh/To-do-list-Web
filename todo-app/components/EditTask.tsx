'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";



export default function EditTask ({ task }: { task: Task }){ 
    const router = useRouter();
    
    const [formData, SetFormData] = useState ({
        title :'', 
        description : '', 
        priority: '', 
        status: '', 
        type: '', 
        dueDate: '',
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState (false); 

     useEffect(() => {
        if ( task) {
            SetFormData({
                title: task.title || "",
                description: task.description || "",
                priority: task.priority || "",
                status: task.status || "",
                type: task.typeId || "",
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",  //Changing dueDate from ISO-8601 DateTime to "YYYY-MM-DD"
            });
        }
    }, [open, task]);

    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target; 
        SetFormData(prev =>({
            ...prev, 
            [name] : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError ('');
        setSuccess ('');

        setIsLoading(true);
        try{
            const response = await fetch(`/api/tasks/${task.id}`,{
                method: 'PUT', 
                headers: {
                    'Content-Type' : 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Something went wrong");
                return;
            }
            setSuccess("Task edited successfully!");

            setOpen(false);
            router.refresh();
        }catch(err){
            console.error("Error editing task:", err);
            setError("Something went wrong");
        } finally{
            setIsLoading (false);
        }
    };
    const handleDelete  = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault (); 
            setError ('');
            setSuccess ('');

            setIsLoading(true);
            try{
                const response = await fetch (`/api/tasks/${task.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type' : 'application/json', 
                    },
                    credentials: 'include'
                })
                
                const data = await response.json(); 
                if(!response.ok) { 
                  setError(data.message || "Something went wrong");
                    return;
                }
                setSuccess("Task deleted successfully!");
                setOpen(false);
                router.refresh();

            }catch (err){
                console.error("Error deleting task:", err);
                setError("Something went wrong")
            } finally{
            setIsLoading (false);
            }
        };
    return (
        <>
        <button
        className="ml-auto text-[#A1A3AB] hover:text-[#F24E1E] transition-colors duration-200"
        onClick={() => setOpen(true)}>
        <MoreHorizontal size={20} />
        </button>
        
        {open && (
            //set size and position fixed in middle 
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg ">
                    <div className="flex mt-[2vh]">
                        <h1 className="font-bold">
                            <span className="underline underline-offset-6 decoration-[#F24E1E]">
                            Edit Ta</span>sk
                        </h1>
                        <h2 className="ml-auto underline underline-offset-1" onClick={() => setOpen(false)}>Go Back</h2> <br />
                    </div>
                    {/* Error và Success Messages */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            {success}
                        </div>
                    )}
                    {/* Data form */}
                    <div className="border shadow-lg border-gray-300 p-4 mt-[3vh]">
                        {/* type */}
                        <div>
                            <label className="font-bold">Type</label><br />
                            <input className="mt-[0.5vh] border rounded-base w-[65%]"
                            name = "type"
                            type="text"
                            value={formData.type}
                            onChange={handleChange}
                            />
                        </div> 
                        {/* title */}
                        <div className="mt-[1vh]">
                            <label className="font-bold">Title</label><br />
                            <input className="mt-[0.5vh] border rounded-base w-[65%]"
                            name = "title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            />
                        </div> 
                        {/* Date */}
                        <div className="mt-[1vh]">
                            <label className="font-bold">Date</label> <br />
                            <input className="mt-[0.5vh] border rounded-base w-[65%]"
                            type="Date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        /> 
                        </div>
                            {/* Priority */}
                        <div className="mt-[2vh]">
                            <label className="font-bold">Priority</label>

                            <div className="flex gap-12">
                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                                        <label>High</label>
                                        <input className="border rounded-base w-4 h-4 accent-red-500" 
                                        type="radio" 
                                        name="priority"
                                        value = "HIGH"
                                        checked = {formData.priority === "HIGH"}
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>

                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-[#0E8DD8] rounded-full inline-block"></span>
                                        <label>Medium</label>
                                        <input className="border rounded-base w-4 h-4 accent-[#0E8DD8]" 
                                        type="radio" 
                                        name="priority"
                                        value = "MEDIUM"
                                        checked = {formData.priority === "MEDIUM"}
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>

                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-[#05A301] rounded-full inline-block"></span>
                                        <label>Low</label>
                                        <input className="border rounded-base w-4 h-4 accent-[#05A301]" 
                                        type="radio" 
                                        name="priority"
                                        value = "LOW"
                                        checked = {formData.priority === "LOW"}  //use to set priority value when checked and value is low 
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>
                            </div>
                        </div>
                        {/* Status */}
                        <div className="mt-[2vh]">
                            <label className="font-bold">Status</label>

                            <div className="flex gap-12">
                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                                        <label>Not Started</label>
                                        <input className="border rounded-base w-4 h-4 accent-red-500" 
                                        type="radio" 
                                        name="status"
                                        value = "NOT_STARTED"
                                        checked = {formData.status === "NOT_STARTED"}
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>

                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-[#0E8DD8] rounded-full inline-block"></span>
                                        <label>In Progress</label>
                                        <input className="border rounded-base w-4 h-4 accent-[#0E8DD8]" 
                                        type="radio" 
                                        name="status"
                                        value = "IN_PROGRESS"
                                        checked = {formData.status === "IN_PROGRESS"}
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>

                                <div className="flex items-center ">
                                    <div className="gap-2 flex items-center">                                              
                                        <span className="w-2 h-2 bg-[#05A301] rounded-full inline-block"></span>
                                        <label>Completed</label>
                                        <input className="border rounded-base w-4 h-4 accent-[#05A301]" 
                                        type="radio" 
                                        name="status"
                                        value = "DONE"
                                        checked = {formData.status === "DONE"}  //use to set priority value when checked and value is low 
                                        onChange={handleChange}
                                        />                    
                                    </div>      
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="mt-[2vh]">
                            <label className="font-bold">Task Description</label> <br />
                            
                            <textarea className="border rounded-lg w-[65%] h-[25vh]"
                            placeholder="Start writing here..."
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="border rounded-lg p-2 w-[10vh] mt-[2vh] text-white bg-[#F24E1E]"
                                onClick={handleSubmit}
                                disabled={isLoading} >
                            {isLoading ? "Saving..." : "Done"}
                        </button>

                        <button className="border rounded-lg p-2 w-[10vh] mt-[2vh] text-white bg-[#F24E1E] ml-auto"
                                onClick={handleDelete}
                                disabled = {isLoading}>
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                   </div>
                </div>
            </div>
        )}
        </>
    );
}