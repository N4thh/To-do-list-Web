'use client'
import { useState } from "react";

export default function AddTask (){ 
    const [formData, SetFormData] = useState ({
        title :'', 
        description : '', 
        priority: 'MEDIUM', 
        status: 'TODO', 
        type: 'MY_PROJECT', 
        dueDate: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState (false); 
    
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
            const token = localStorage.getItem("authToken"); 
            if(!token){
                setError("User is not authenticated");
                setIsLoading(false); 
                return;
            }
            const response = await fetch("/api/tasks",{
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Something went wrong");
                return;
            }
            setSuccess("Task created successfully!");

            SetFormData({
            title: '',
            description: '',
            priority: 'MEDIUM',
            status: 'TODO',
            type: 'MY_PROJECT',
            dueDate: '',
        });

            setOpen(false);
        }catch(err){
            console.error("Error creating task:", err);
            setError("Something went wrong");
        } finally{
            setIsLoading (false);
        }

    };
    return (
        <>
        <button className="ml-auto" onClick={() => setOpen(true)}>
            Add Task
        </button>
        
        {open && (
            //set size and position fixed in middle 
            <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg ">
                    <div className="flex mt-[2vh]">
                        <h1 className="font-bold">
                            <span className="underline underline-offset-6 decoration-[#F24E1E]">
                            Add New Ta</span>sk
                        </h1>
                        <h2 className="ml-auto">Go Back</h2> <br />
                    </div>
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
                    <button className="border rounded-lg p-2 w-[10vh] mt-[2vh] text-white bg-[#F24E1E]"
                            onClick={handleSubmit}
                              disabled={isLoading} >
                        {isLoading ? "Saving..." : "Done"}
                    </button>
                   
                </div>
            </div>
        )}
        </>
    );
}