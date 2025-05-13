<?php

namespace App\Http\Controllers;

use App\Models\StudyProgram;
use App\Models\StudyProgramContact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudyProgramContactController extends Controller
{
    /**
     * Store or update contact information for a study program
     * 
     * @param Request $request
     * @param int $studyProgramId
     * @return JsonResponse
     */
    public function store(Request $request, int $studyProgramId): JsonResponse
    {
        try {
            // Validasi request
            $validator = Validator::make($request->all(), [
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'whatsapp' => 'nullable|string|max:20',
                'website' => 'nullable|string|max:255',
                'instagram' => 'nullable|string|max:100',
                'youtube' => 'nullable|string|max:100',
                'address' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Cari program studi
            $studyProgram = StudyProgram::findOrFail($studyProgramId);
            
            // Cari kontak yang sudah ada atau buat baru
            $contact = $studyProgram->contact;
            
            if (!$contact) {
                $contact = new StudyProgramContact();
                $contact->study_program_id = $studyProgramId;
            }
            
            // Update data kontak
            $contact->email = $request->email;
            $contact->phone = $request->phone;
            $contact->whatsapp = $request->whatsapp;
            $contact->website = $request->website;
            $contact->instagram = $request->instagram;
            $contact->youtube = $request->youtube;
            $contact->address = $request->address;
            
            $contact->save();
            
            return response()->json([
                'status' => true,
                'message' => 'Informasi kontak berhasil disimpan',
                'data' => $contact
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan informasi kontak',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get contact information for a study program
     * 
     * @param int $studyProgramId
     * @return JsonResponse
     */
    public function getData(int $studyProgramId): JsonResponse
    {
        try {
            $studyProgram = StudyProgram::findOrFail($studyProgramId);
            $contact = $studyProgram->contact;
            
            return response()->json([
                'status' => true,
                'data' => $contact
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memuat informasi kontak',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}